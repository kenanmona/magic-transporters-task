created three collections: (Magic Mover, Magic Item, Mission Log)

relations used:

    # Magic Mover has Many Magic Items (One To Many)
    # Magic Mover has Many Missions logs (One To Many)
    # Mission Log has one Magic Mover (Many To One)
    # Mission Log has Many Magic Items (One To Many)

#######################################

to run the project:

    # run : yarn
    # run : yarn start
    # localhost for test : http://localhost:3000

#######################################

created 6 endpoints:

    1 =>
    ## create magic mover endpoint: http://localhost:3000/movers (POST Request)
       body:{
            "weight_limit": Number
       }
       response:{
            "mover": {
                "weight_limit": 2,
                "quest_state": "resting", // default value
                "missions_completed": 0,  // default value
                "magic_items": [],
                "mission_logs": [],
                "_id": "67371c679b4f2a4924fe8894",
                "__v": 0
            }
       }

    2 =>
    ## create magic item endpoint: http://localhost:3000/items (POST Request)
       body:{
            "name": String,
            "weight": Number
       }
       response:{
            "item": {
                "name": "item_5",
                "weight": 5,
                "_id": "673721819b4f2a4924fe8897",
                "__v": 0
            }
       }

    3 =>
    ## create list who completed the most missions endpoint: http://localhost:3000/movers (GET Request)
       response:{
             "magic_movers": [
                {
                    "_id": "673716ecab70c909af7d91ec",
                    "weight_limit": 2,
                    "quest_state": "resting",
                    "missions_completed": 1,
                    "magic_items": [],
                    "mission_logs": [
                        "67371713ab70c909af7d91f4"
                    ],
                    "__v": 3
                },
                {
                     "_id": "67371c679b4f2a4924fe8894",
                     "weight_limit": 2,
                     "quest_state": "resting",
                     "missions_completed": 0,
                     "magic_items": [],
                     "mission_logs": [],
                     "__v": 0
                 }
             ]
       }

    4 =>
    ## create load items into mover endpoint: http://localhost:3000/movers/:id (POST Request) (id => mover id)
       body:{
            "item_id": String
       }
       response:{
            {
                "message": "item loaded successfuly."
            }
       }
       #explain:
            * to load items into mover, quest_state field in mover must be 'resting' or 'loading'
            * to load items into mover, weight_limit field in mover must be bigger than weight field in item
            * while you are adding items => quest_state field in mover will be 'loading'


    5 =>
    ## create start a mission (mover delivers the items) endpoint: http://localhost:3000/missions/start (POST Request)
       body:{
            "mover_id": String
       }
       response:{
            {
                "mover": {
                    "_id": "673716ecab70c909af7d91ec",
                    "weight_limit": 2,
                    "quest_state": "on-mission",
                    "missions_completed": 0,
                    "magic_items": [
                        "673704abc80a08fd4fe84caa"
                    ],
                    "mission_logs": [
                        "673724796de0d129f8233ee0"
                    ],
                    "__v": 4
                },
                "mission_log": {
                    "start_time": "2024-11-15T10:37:45.321Z",
                    "magic_mover": "673716ecab70c909af7d91ec",
                    "magic_items": [
                        "673704abc80a08fd4fe84caa"
                    ],
                    "_id": "673724796de0d129f8233ee0",
                    "__v": 0
                }
            }
       }
       #explain:
            * to start a mission, quest_state field in mover must be 'loading'
            * after start a mission, quest_state field in mover will be 'on-mission'
            * after start a mission, magic_items field in mission log will be the same value in mover's magic_items
            * if quest_state field in mover is 'on-mission', you can not add items into mover


    6 =>
    ## create end a mission (mover delivered the items) endpoint: http://localhost:3000/missions/end (POST Request)
       body:{
            "mover_id": String
       }
       response:{
            {
                "mover": {
                    "_id": "673716ecab70c909af7d91ec",
                    "weight_limit": 2,
                    "quest_state": "resting",
                    "missions_completed": 1,
                    "magic_items": [],
                    "mission_logs": [
                        "67371713ab70c909af7d91f4"
                    ],
                    "__v": 3
                },
                "missionLog": {
                    "_id": "67371713ab70c909af7d91f4",
                    "start_time": "2024-11-15T09:40:35.843Z",
                    "magic_mover": "673716ecab70c909af7d91ec",
                    "magic_items": [
                        "673704b0c80a08fd4fe84cac"
                    ],
                    "__v": 0,
                    "end_time": "2024-11-15T09:41:47.385Z"
                }
            }
       }
       #explain:
            * to end a mission, quest_state field in mover must be 'on-mission'
            * to end a mission, end_time field in mission log must be not exist (null)
            * after end a mission, quest_state field in mover will be 'resting'
            * after end a mission, end_time field in mission log will has value now date
            * after end a mission, magic_items field in mover will be empty []
