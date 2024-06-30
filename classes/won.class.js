/**
 * This class sets the GameWon Image on the map
 */
class GameWON extends DrawableObject {
   
    world;

    youWon(){
        document.getElementById('wonScreen').style.display = 'flex';
    }
}