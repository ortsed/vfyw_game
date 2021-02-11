# vfyw_game
A Django/Javascript/Google Maps API geographic guessing game

The Django application runs a server that renders the game site and returns an API for each game module. 

Within each game it renders a picture and a map that allows the user to try and guess the section of the map that the image was taken from. It counts each guess until a set number of guesses has expired or the player has found the location.

It includes the images that were originally used with the game based on pictures from The View From Your Window on the Daily Dish, although the database that matches images to locations (lat/ong) is currently missing and would need to be filled in.  Can easily be recreated as long as you know the location and can retrieve lat/long from Google maps or someplace similar.

Geoguessr is a more current game like this.
