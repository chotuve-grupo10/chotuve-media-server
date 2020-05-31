Feature: Ping
    Como sysadmin, quiero que el servidor me responda un ping para saber que esta activo

    Scenario: Ping
        When I Ping the server
        Then I get an OK response
        And the result is the health status
