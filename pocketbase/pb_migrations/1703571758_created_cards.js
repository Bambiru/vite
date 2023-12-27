/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "snu9vvqbjxbrsja",
    "created": "2023-12-26 06:22:38.647Z",
    "updated": "2023-12-26 06:22:38.647Z",
    "name": "cards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "1sp8frz5",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "csauppag",
        "name": "description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("snu9vvqbjxbrsja");

  return dao.deleteCollection(collection);
})
