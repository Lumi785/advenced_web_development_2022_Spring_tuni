-- Fetch players from end point on load
-- Update the id from the fetched players
-- Add player to the end of the list


module Main exposing (..)

import Browser
import Debug
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http exposing (Error(..))
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



-- GotText (Result Http.Error String)


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
    let
        _ =
            Debug.log "msg = " msg

        _ =
            Debug.log "model = " model
    in
    case msg of
        SetName word ->
            let
                updatedPlayer =
                    Player (model.newPlayer.id + 1) word False
            in
            ( { model | newPlayer = updatedPlayer }, Cmd.none )

        AddPlayer ->
            let
                updatedPlayers =
                    model.players ++ [ model.newPlayer ]
            in
            ( { model | players = updatedPlayers }, Cmd.none )

        DeletePlayer id ->
            let
                afterDelPlayers =
                    List.filter (\player -> player.id /= id) model.players
            in
            ( { model | players = afterDelPlayers }, Cmd.none )

        ModifyPlayer id status ->
            let
                updateStatus player =
                    if player.id == id then
                        { player | isActive = status }

                    else
                        player

                modifiedPlayers =
                    List.map updateStatus model.players
            in
            ( { model | players = modifiedPlayers }, Cmd.none )

        FetchPlayers data ->
            -- data = Result Error (List Player)
            -- GotText (Result Http.Error String)
            case data of
                Ok playersList ->
                    -- let
                    --     readyPlayers =
                    --         playersList
                    -- in
                    ( { model | players = playersList, reqStatus = "" }, Cmd.none )

                Err _ ->
                    ( { model | players = [], reqStatus = "An error has occurred!!!" }, Cmd.none )



-- Err _ ->
--     (Failure, Cmd.none)
-- ( { model | players = fetchPlayers }, Cmd.none )
-- case msg of
--     GotText result ->
--         case result of
--             Ok fullText ->
--                 (Success fullText, Cmd.none)
--             Err _ ->
--                 (Failure, Cmd.none)


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
