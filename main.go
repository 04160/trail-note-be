package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	_ "github.com/lib/pq"
)

var db *gorm.DB

//TODO: add dotenv
const (
	host   = "localhost"
	port   = 5432
	user   = "kadikis"
	dbname = "trail-note"
)

//TODO: split off as seperate models in a model directory
type (
	User struct {
		gorm.Model
		Username string
		Password string
	}
	Trail struct {
		gorm.Model
		User      User       `gorm:"foreignkey:_user_id"`
		UserId    uint       `gorm:column"_user_id"`
		Geopoints []Geopoint `gorm:"foreignkey:TrailId"`
		Name      string
	}
	Geopoint struct {
		gorm.Model
		Trail   Trail `gorm:foreignkey:_trail_id`
		TrailId uint  `gorm:"column:_trail_id"`
		Lat     float64
		Lon     float64
	}
	Pic struct {
		gorm.Model
		Filename string
	}
	Text struct {
		gorm.Model
		Text string
	}
	Media struct {
		gorm.Model
		Pic    Pic           `gorm:foreignkey:PicId`
		PicId  sql.NullInt64 `gorm:column:"_pic_id"`
		Text   Text          `gorm:foreignkey:_text_id`
		TextId sql.NullInt64 `gorm:column:"_text_id"`
	}
)

func init() {
	var err error
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s dbname=%s sslmode=disable",
		host, port, user, dbname)

	db, err = gorm.Open("postgres", psqlInfo)

	if err != nil {
		panic(err)
	}

	err = db.DB().Ping()
	if err != nil {
		panic(err)
	}

	//TODO: Create migrations
	db.AutoMigrate(&User{}, &Trail{}, &Geopoint{}, &Pic{}, &Text{}, &Media{})
}

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	v1 := router.Group("/api/v1/trail")
	{
		//TODO: split into more managable form
		//For frontend
		v1.GET("/", getTrails)
		v1.GET("/:id", getSingleTrail)
		v1.GET("/:id/points", getGeopoints)
		//For data import
		v1.POST("/", createTrail)
	}

	router.Use(static.Serve("/img", static.LocalFile("./storage/images", true)))

	router.Run() // listen and serve on 0.0.0.0:8080
}

//TODO: Seperate file for frontend needs
func getTrails(c *gin.Context) {
	var trails []Trail
	db.Find(&trails)
	if len(trails) <= 0 {
		c.JSON(http.StatusNotFound, "No trails found!")
		return
	}

	c.JSON(http.StatusOK, trails)
}

func getSingleTrail(c *gin.Context) {
	var trail Trail

	db.Preload("Geopoints").First(&trail, c.Param("id"))

	if trail.ID == 0 {
		c.JSON(http.StatusNotFound, "No trail found!")
		return
	}

	c.JSON(http.StatusOK, trail)
}

func getGeopoints(c *gin.Context) {

}

//TODO: Seperate file for data import
func createTrail(c *gin.Context) {

}
