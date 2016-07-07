var APP_DATA = {
    "scenes": [{
        "id": "0-scene-1",
        "name": "Scene 1",
        "levels": [{
            "tileSize": 256,
            "size": 256,
            "fallbackOnly": true
        }, {
            "tileSize": 512,
            "size": 512
        }],
        "faceSize": 2048,
        "initialViewParameters": {
            "yaw": -1.2,
            "pitch": 0,
            "fov": 1.5707963267948966
        },
        "linkHotspots": [{
            "yaw": 2.12678386676067,
            "pitch": -0.1076340532339251865,
            "rotation": 0,
            "target": "0-scene-2"
        }],
    }, {
        "id": "0-scene-2",
        "name": "Scene 2",
        "levels": [{
            "tileSize": 256,
            "size": 256,
            "fallbackOnly": true
        }, {
            "tileSize": 512,
            "size": 512
        }],
        "faceSize": 2048,
        "initialViewParameters": {
            "yaw": -1.2,
            "pitch": 0,
            "fov": 1.5707963267948966
        },
        "linkHotspots": [{
            "yaw": 3.77678386676067,
            "pitch": 0.0176340532339251865,
            "rotation": 0,
            "target": "0-scene-1"
        },
        {
            "yaw": 0.12678386676067,
            "pitch": 0.0176340532339251865,
            "rotation": 0,
            "target": "0-scene-3"
        }
        ],
    }, {
        "id": "0-scene-3",
        "name": "Scene 3",
        "levels": [{
            "tileSize": 256,
            "size": 256,
            "fallbackOnly": true
        }, {
            "tileSize": 512,
            "size": 512
        }],
        "faceSize": 2048,
        "initialViewParameters": {
            "yaw": -1.2,
            "pitch": 0,
            "fov": 1.5707963267948966
        },
        "linkHotspots": [{
            "yaw": 5.12678386676067,
            "pitch": -0.0176340532339251865,
            "rotation": 0,
            "target": "0-scene-2"
        }],
    }],
    "name": "Project Title",
    "settings": {
        "mouseViewMode": "drag",
        "autorotateEnabled": false,
        "fullscreenButton": false,
        "viewControlButtons": false
    }
};
