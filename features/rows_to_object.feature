Feature: Raw To Object

  Scenario: converts rows to object
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
    Then it should parse from rows to:
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
