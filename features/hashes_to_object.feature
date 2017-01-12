Feature: Raw To Object

  Scenario: converts raw to object
    Given the following:
      | key        | value |
      | id         | 1     |
      | name/first | Randy |
      | keys/0     | one   |
      | empty      | [ ]   |
      | bare       | { }   |
      | nothing    | null  |
      | truthy     | true  |
      | falsey     | false |
    Then it should parse from hashes to:
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
