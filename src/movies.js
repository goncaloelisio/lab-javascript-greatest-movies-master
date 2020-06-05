// Iteration 1: All directors? - Get the array of all directors.

function getAllDirectors(movies) {
    return movies.map(movie => movie.director )
    
}


// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors. How could you "clean" a bit this array and make it unified (without duplicates)?

function getAllDirectors(movies) {
    const mappedArray = movies.map(movie => movie.director)
		return mappedArray.filter((director,index) => mappedArray.indexOf(director) === index)
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?

function howManyMovies(movies){
    return movies.filter(movie => movie.genre.includes('Drama') && movie.director === "Steven Spielberg").length;  
};

// Iteration 3: All rates average - Get the average of all rates with 2 decimals

function ratesAverage(movies) {
    if ( movies.length === 0) {
        return 0
    }
    const totalRates = movies.reduce((acc,curr) => {
        return acc + (curr.rate || 0)
    },0)
    return Math.round((totalRates / movies.length) * 100) / 100
}

// Iteration 4: Drama movies - Get the average of Drama Movies

function dramaMoviesRate(movies) {
    const totalDramaArray = movies.filter(dramaMovies => dramaMovies.genre.includes("Drama"))
    return ratesAverage(totalDramaArray)

}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)

function orderByYear(movies) {
    let newArray = movies.sort((a, b) => {
        return a.year > b.year ? 1 : -1;
    })
    return [...newArray]
  }

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles

function orderAlphabetically(movies) {
	const titleArray = []
	for (const movie of movies) {
		titleArray.push(movie.title);
	}
	titleArray.sort()
	return titleArray.slice(0,20)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes

function turnHoursToMinutes(movies) {
    return movies.map(movie => {
      let time = movie.duration.split(" ")
      let duration
      let hours = 0
      let minutes = 0
      time.forEach((mov) => {
        if (mov.includes("h")) {
          hours = +mov.replace("h", "")
        }
        if (mov.includes("m")) {
          minutes = +mov.replace("min", "")
        }
        duration = hours * 60 + minutes
      })
      return ({
        ...movie,
        duration
      })
    })
  }

// BONUS - Iteration 8: Best yearly rate average - Best yearly rate average

function bestYearAvg(movies) {
    if (movies.length === 0) {
        return null
    }

    const moviesByYear = {}
    let highestRatingYear = 0
    let currentHighestAvgRating = 0
    for (element of movies) {
        if (!moviesByYear[element.year]) {
            const newObject = {}            
            newObject.movies = movies.filter(movie => movie.year === element.year)
            newObject.avgRate = ratesAverage(newObject.movies)
            moviesByYear[element.year] = newObject;
            if(newObject.avgRate > currentHighestAvgRating) {
                highestRatingYear = element.year
				currentHighestAvgRating = newObject.avgRate
            }
            else if (newObject.avgRate === currentHighestAvgRating) {
                if (element.year < highestRatingYear) {
                    highestRatingYear = element.year
				    currentHighestAvgRating = newObject.avgRate
                }
            }
        }
    }
		//return moviesByYear
    return `The best year was ${highestRatingYear} with an average rate of ${moviesByYear[highestRatingYear].avgRate}`;
}