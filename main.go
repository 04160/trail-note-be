package main

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
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
	dbname = "trail_note"
)

//TODO: split off as seperate models in a model directory
type (
	userModel struct {
		gorm.Model
		username string
		password string
	}
	trailModel struct {
		gorm.Model
		User     userModel `gorm:"foreignkey:_user_id"`
		_user_id uint
		name     string
	}
	geopointModel struct {
		gorm.Model
		Trail     trailModel `gorm:foreignkey:_trail_id`
		_trail_id uint
		lat       float64
		lon       float64
	}
	picModel struct {
		gorm.Model
		filename string
	}
	textModel struct {
		gorm.Model
		text string
	}
	mediaModel struct {
		gorm.Model
		Pic      picModel `gorm:foreignkey:_pic_id`
		_pic_id  *uint
		Text     textModel `gorm:foreignkey:_text_id`
		_text_id *uint
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

	//TODO: Create migrations, right now everything will be hardcoded for initial MVP
	//TODO: don't use gorms automigrate, create migrations instead
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
		v1.GET("/:id", getGeopoints)
		//For data import
		v1.POST("/", createTrail)
	}

	router.Run() // listen and serve on 0.0.0.0:8080
}

//TODO: Seperate file for frontend needs
func getTrails(c *gin.Context) {
	var trails []trailModel
	db.Find(&trails)
	if len(trails) <= 0 {
		c.JSON(http.StatusNotFound, "No bills found!")
		return
	}

	c.JSON(http.StatusOK, trails)
}

func getSingleTrail(c *gin.Context) {

}

func getGeopoints(c *gin.Context) {

}

//TODO: Seperate file for data import
func createTrail(c *gin.Context) {

}
