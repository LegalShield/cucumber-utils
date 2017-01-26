Feature: Raw To Object

  Scenario: converts rows to object
    Given the following rows object:
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
    Given the following rows form body:
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
