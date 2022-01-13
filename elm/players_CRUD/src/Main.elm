module Main exposing (..)

import Browser
import Debug
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    }


type Msg
    = SetName String
    | AddPlayer
    | ModifyPlayer Int Bool
    | DeletePlayer Int


init : Model
init =
    { players = []
    , newPlayer = initPlayer 0
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        SetName name ->
            let
                updatedPlayer =
                    Player (model.newPlayer.id + 1) name False
            in
            { model | newPlayer = updatedPlayer }

        AddPlayer ->
            -- model.players.append model.newPlayer
            model

        DeletePlayer id ->
            model

        ModifyPlayer id status ->
            model


view : Model -> Html Msg
view model =
    Html.form [ id "submit-player" ]
        [ input [ type_ "text", value model.newPlayer.name, id "input-player", onInput SetName, placeholder "player name" ] []
        , button [ onSubmit AddPlayer, id "btn-add" ] [ text "Add" ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
