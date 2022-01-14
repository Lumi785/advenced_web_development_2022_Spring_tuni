module Main exposing (..)

import Array
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
    let
        _ =
            Debug.log "new message = " msg

        _ =
            Debug.log "new model = " model
    in
    case msg of
        SetName name ->
            let
                updatedPlayer =
                    Player (model.newPlayer.id + 1) name False
            in
            { model | newPlayer = updatedPlayer }

        AddPlayer ->
            let
                updatedPlayers =
                    model.players ++ [ model.newPlayer ]
            in
            { model | players = updatedPlayers }

        DeletePlayer id ->
            let
                afterDelPlayers =
                    List.filter (\player -> player.id /= id) model.players
            in
            { model | players = afterDelPlayers }

        ModifyPlayer id status ->
            -- let
            --     afterModifyPlayers =
            --         List.map (\fPlayer -> fPlayer.status /= fPlayer.status) model.players
            -- in
            -- { model | players = afterModifyPlayers }
            model


view : Model -> Html Msg
view model =
    -- let
    --     aName =
    --         (Array.get (List.length model.players - 1) (Array.fromList model.players)).name
    -- in
    -- let
    --     aName =
    --         Array.get 0 (Array.fromList (List.filter (\player -> player.id == id) model.players))
    -- in
    div []
        [ h1 [] [ text "Players CRUD" ]
        , h2 [] [ text "Manage hockey players with Elm" ]
        , h3 [] [ text "Add Player" ]
        , Html.form [ id "submit-player", onSubmit AddPlayer ]
            [ input [ type_ "text", value model.newPlayer.name, id "input-player", onInput SetName, placeholder "player name" ] []
            , button [ type_ "submit", id "btn-add" ] [ text "Add" ]
            ]
        , h3 [] [ text "Players List" ]
        , ol [ id "players-list" ]
            (List.map (\player -> li [] [ text player.name ]) model.players)

        -- [ li [ id ("player-" ++ String.fromInt model.newPlayer.id) ]
        --     [ div [ class "player-name" ] [ text model.newPlayer.name ]
        --     , input [ type_ "checkbox" ] [ text "active" ]
        --     ]
        -- ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
