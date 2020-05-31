Feature: Upload video
    Como usuario, quiero subir un video para que el resto de los usuarios en la plataforma pueda verlo

    Scenario: upload video
        When I post the server whit a new video
        Then I get an OK response
        And the result is that the video was uploaded
