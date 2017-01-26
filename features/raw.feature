Feature: Raw

  Scenario: converts raw to object
    Given the following raw object:
      | id         | 1         |
      | name/first | Randy     |
      | keys/0     | one       |
      | empty      | [ ]       |
      | bare       | { }       |
      | nothing    | null      |
      | truthy     | true      |
      | falsey     | false     |
    Then it should have parsed as:
      """
        {
          "id": 1,
          "name": { "first": "Randy" },
          "keys": [ "one" ],
          "empty": [ ],
          "bare": { },
          "nothing": null,
          "truthy": true,
          "falsey": false
        }
      """

  Scenario: converts raw to form body
    Given the following raw form body:
      | id                  | 1               |
      | name/first          | Randy           |
      | collections/0/id    | 1               |
      | collections/0/name  | Randall         |
      | collections/0/email | email@email.com |
      | keys/0              | one             |
      | nothing             | null            |
      | truthy              | true            |
      | falsey              | false           |
    Then it should have parsed as:
      """
        {
          "id": "1",
          "name[first]": "Randy",
          "keys[0]": "one",
          "collections[0][id]": "1",
          "collections[0][name]": "Randall",
          "collections[0][email]": "email@email.com",
          "nothing": "",
          "truthy": "true",
          "falsey": "false"
        }
      """
