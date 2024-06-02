let level1;
function initLevel(){

level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken()
    ],
    [
        new Clouds('img/5_background/layers/4_clouds/1.png', 10, 0),
        new Clouds('img/5_background/layers/4_clouds/2.png', 35, 0),
        new Clouds('img/5_background/layers/4_clouds/1.png', 10, 720),
        new Clouds('img/5_background/layers/4_clouds/2.png', 35, 720),
        new Clouds('img/5_background/layers/4_clouds/1.png', 10, 1440),
        new Clouds('img/5_background/layers/4_clouds/2.png', 35, 1440),
        new Clouds('img/5_background/layers/4_clouds/1.png', 10, 2160),
        new Clouds('img/5_background/layers/4_clouds/2.png', 35, 2160),
    ],
    [
        new Background(`img/5_background/layers/air.png`, -719),
        new Background(`img/5_background/layers/3_third_layer/2.png`, -719),
        new Background(`img/5_background/layers/2_second_layer/2.png`, -719),
        new Background(`img/5_background/layers/1_first_layer/2.png`, -719),
        new Background(`img/5_background/layers/air.png`, 0),
        new Background(`img/5_background/layers/3_third_layer/1.png`, 0),
        new Background(`img/5_background/layers/2_second_layer/1.png`, 0),
        new Background(`img/5_background/layers/1_first_layer/1.png`, 0),
        new Background(`img/5_background/layers/air.png`, 719),
        new Background(`img/5_background/layers/3_third_layer/2.png`, 719),
        new Background(`img/5_background/layers/2_second_layer/2.png`, 719),
        new Background(`img/5_background/layers/1_first_layer/2.png`, 719),
        new Background(`img/5_background/layers/air.png`, 1438),
        new Background(`img/5_background/layers/3_third_layer/1.png`, 1438),
        new Background(`img/5_background/layers/2_second_layer/1.png`, 1438),
        new Background(`img/5_background/layers/1_first_layer/1.png`, 1438),
        new Background(`img/5_background/layers/air.png`, 2156),
        new Background(`img/5_background/layers/3_third_layer/2.png`, 2156),
        new Background(`img/5_background/layers/2_second_layer/2.png`, 2156),
        new Background(`img/5_background/layers/1_first_layer/2.png`, 2156)
    ],
    [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ],
    [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle()
    ]
);
}