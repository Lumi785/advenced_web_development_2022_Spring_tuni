-- Fetch players from end point on load
-- Update the id from the fetched players
-- Add player to the end of the list


module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , reqStatus : String
    }


type Msg
    = SetName String
    | ModifyPlayer Int Bool
    | AddPlayer
    | DeletePlayer Int
    | FetchPlayers (Result Http.Error (List Player))


playerDecoder : Decoder Player
playerDecoder =
    map3 Player (field "id" Decode.int) (field "name" Decode.string) (field "isActive" Decode.bool)


playersDecoder : Decoder (List Player)
playersDecoder =
    Decode.list playerDecoder


fetchPlayers : String -> Cmd Msg
fetchPlayers url =
    Http.get
        { url = url
        , expect = Http.expectJson FetchPlayers playersDecoder
        }


listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


init : () -> ( Model, Cmd Msg )
init _ =
    ( { players = []
      , newPlayer = initPlayer 0
      , reqStatus = "Loading..."
      }
    , fetchPlayers "http://localhost:3001/api/players/"
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetName word ->
            ( model, Cmd.none )

        AddPlayer ->
            ( model, Cmd.none )

        DeletePlayer id ->
            ( model, Cmd.none )

        ModifyPlayer id status ->
            ( model, Cmd.none )

        FetchPlayers data ->
            ( model, Cmd.none )


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Players CRUD" ]
        , h2 [] [ text "Update app from server" ]
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
                        [ div [ class "player-name" ] [ text player.name ]
                        , input
                            [ type_ "checkbox"
                            , class "player-status"
                            , checked player.isActive
                            , onCheck (ModifyPlayer player.id)
                            ]
                            []
                        , label [] [ text "Active" ]
                        , br [] []
                        , button [ type_ "button", class "btn-delete", onClick (DeletePlayer player.id) ] [ text "Delete" ]
                        ]
                )
                model.players
            )
        ]


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
