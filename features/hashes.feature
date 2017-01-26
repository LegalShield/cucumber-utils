Feature: Raw To Object

  Scenario: converts hashes to object
    Given the following hashes object:
      | key        | value |
      | id         | 1     |
      | name/first | Randy |
      | keys/0     | one   |
      | empty      | [ ]   |
      | bare       | { }   |
      | nothing    | null  |
      | truthy     | true  |
      | falsey     | false |
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

  Scenario: converts hashes to form body
    Given the following hashes form body:
      | key          | value |
      | id           | 1     |
      | name/first   | Randy |
      | keys/0       | one   |
      | items/0/id   | one   |
      | items/0/name | one   |
      | empty        | [ ]   |
      | bare         | { }   |
      | nothing      | null  |
      | truthy       | true  |
      | falsey       | false |
    Then it should have parsed as:
      """
        {
          "id": "1",
          "name[first]": "Randy",
          "keys[0]": "one",
          "items[0][id]": "one",
          "items[0][name]": "one",
          "nothing": "",
          "truthy": "true",
          "falsey": "false"
        }
      """
