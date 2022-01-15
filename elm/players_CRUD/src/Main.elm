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
            let
                updateStatus player =
                    if player.id == id then
                        { player | isActive = status }

                    else
                        player

                afterModifyPlayers =
                    List.map updateStatus model.players
            in
            { model | players = afterModifyPlayers }


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Players CRUD" ]
        , h2 [] [ text "Manage hockey players with Elm" ]
        , h3 [] [ text "Add Player" ]
        , Html.form [ id "submit-player", onSubmit AddPlayer ]
            [ input [ type_ "text", value model.newPlayer.name, id "input-player", onInput SetName, placeholder "player name" ] []
            , button [ type_ "submit", id "btn-add" ] [ text "Add" ]
            ]
        , h3 []
            [ text "Players List" ]
        , ol
            [ id "players-list" ]
            (List.map
                (\player ->
                    li [ id ("player-" ++ String.fromInt player.id) ]
                        [ div [] [ text player.name ]
                        , input
                            [ type_ "checkbox"
                            , checked player.isActive
                            , onCheck (ModifyPlayer player.id)
                            ]
                            []
                        , label [] [ text "Active" ]
                        , br [] []
                        , button [ type_ "button", onClick (DeletePlayer player.id) ] [ text "Delete" ]
                        ]
                )
                model.players
            )

        -- [ List.map
        --     ( \player ->
        --         li []
        --             [ div [] [ text player.name ] ]
        --     , input [ type_ "checkbox", onCheck (ModifyPlayer id), value status ] []
        --     , text "active"
        --     , br [] []
        --     , button [ type_ "button", onClick (DeletePlayer id) ] [ text "Delete" ]
        --     )
        --     model.players
        -- ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
