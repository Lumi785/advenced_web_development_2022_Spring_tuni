-- Fetch players from backend on load
-- Delete player from backend first then delete player from frontend on success
-- modify player from backend first then modify player from frontend on success
-- modify player from backend first then modify player from frontend on success
-- add player to backend first then add player to frontend on success


module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)
import Json.Encode as Encode


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , baseUrl : String
    , reqStatus : String
    }


type Msg
    = SetName String
    | FetchPlayers (Result Http.Error (List Player))
    | PutPlayerReq Int Bool
    | ModifyPlayer (Result Http.Error Player)
    | PostPlayerReq
    | AddPlayer (Result Http.Error Player)
    | DeletePlayerReq Int
    | DeletePlayer Int (Result Http.Error ())


playerEncoder : Player -> Encode.Value
playerEncoder player =
    Encode.object
        [ ( "id", Encode.int player.id )
        , ( "name", Encode.string player.name )
        , ( "isActive", Encode.bool player.isActive )
        ]


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


postPlayerReq : String -> Player -> Cmd Msg
postPlayerReq url player =
    Http.post
        { url = url
        , expect = Http.expectJson AddPlayer playerDecoder
        , body = Http.jsonBody (playerEncoder player)
        }


deletePlayerReq : String -> Int -> Cmd Msg
deletePlayerReq url id =
    Http.request
        { url = url ++ String.fromInt id
        , expect = Http.expectWhatever (DeletePlayer id)
        , headers = [ Http.header "Accept" "*/*" ]
        , method = "DELETE"
        , body = Http.emptyBody
        , timeout = Nothing
        , tracker = Nothing
        }


putPlayerReq : String -> Player -> Cmd Msg
putPlayerReq url player =
    Http.request
        { url = url ++ String.fromInt player.id
        , expect = Http.expectJson ModifyPlayer playerDecoder
        , headers = [ Http.header "Accept" "*/*" ]
        , method = "PUT"
        , body = Http.jsonBody (playerEncoder player)
        , timeout = Nothing
        , tracker = Nothing
        }


listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


initModel : Model
initModel =
    { players = []
    , newPlayer = initPlayer 0
    , baseUrl = "http://localhost:3001/api/players/"
    , reqStatus = "Loading..."
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( initModel
    , fetchPlayers initModel.baseUrl
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        _ =
            Debug.log "model = " model

        _ =
            Debug.log "Msg = " msg
    in
    case msg of
        SetName word ->
            let
                updatedPlayer =
                    Player (model.newPlayer.id + 1) word False
            in
            ( { model | newPlayer = updatedPlayer }, Cmd.none )

        FetchPlayers data ->
            case data of
                Ok playersList ->
                    ( { model | players = playersList, reqStatus = "" }, Cmd.none )

                Err _ ->
                    ( { model | reqStatus = "An error has occurred!!!" }, Cmd.none )

        PostPlayerReq ->
            let
                aPlayer =
                    Player model.newPlayer.id model.newPlayer.name False

                url =
                    "http://localhost:3001/api/players/"
            in
            ( model, postPlayerReq url aPlayer )

        AddPlayer data ->
            case data of
                Ok player ->
                    let
                        newPlayers =
                            model.players ++ [ player ]
                    in
                    ( { model | players = newPlayers, reqStatus = "" }, Cmd.none )

                Err _ ->
                    ( { model | reqStatus = "An error has occurred!!!" }, Cmd.none )

        PutPlayerReq id status ->
            ( model, Cmd.none )

        -- let
        --     playerToBeModifyArray =
        --         List.filter (\player -> player.id == id) model.players
        --     playerToBeModify =
        --         List.head playerToBeModifyArray
        -- in
        -- let
        --     nameOfPlayer =
        --         if playerToBeModify == Nothing then
        --             Nothing
        --         else
        --             (Just playerToBeModify).name
        -- in
        -- let
        --     a_player =
        --         Player id nameOfPlayer status
        --     url =
        --         "http://localhost:3001/api/players/"
        -- in
        -- ( { a_player | isActive = status }, putPlayerReq url a_player )
        ModifyPlayer data ->
            case data of
                Ok player ->
                    ( { model | newPlayer = player, reqStatus = "" }, Cmd.none )

                Err _ ->
                    ( { model | reqStatus = "An error has occurred!!!" }, Cmd.none )

        DeletePlayerReq id ->
            let
                url =
                    "http://localhost:3001/api/players/"
            in
            ( model, deletePlayerReq url id )

        DeletePlayer id data ->
            case data of
                Ok () ->
                    let
                        afterDelPlayers =
                            List.filter (\player -> player.id /= id) model.players
                    in
                    ( { model | players = afterDelPlayers, reqStatus = "" }, Cmd.none )

                Err _ ->
                    ( { model | reqStatus = "An error has occurred!!!" }, Cmd.none )



-- case data of
--         Ok player ->
--             ( { model | newPlayer = player, reqStatus = "" }, Cmd.none )
--         Err _ ->
--             ( { model | reqStatus = "An error has occurred!!!" }, Cmd.none )
--     ( model, Cmd.none )


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Players CRUD" ]
        , h2 [] [ text "Update app from server" ]
        , h3 [] [ text "Add Player" ]
        , Html.form [ id "submit-player", onSubmit PostPlayerReq ]
            [ input [ type_ "text", value model.newPlayer.name, id "input-player", onInput SetName, placeholder "player name" ] []
            , button [ type_ "submit", id "btn-add" ] [ text "Add" ]
            ]
        , h3 []
            [ text "Players List" ]
        , h3 [ id "request-status" ] [ text model.reqStatus ]
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
                            , onCheck (PutPlayerReq player.id)
                            ]
                            []
                        , label [] [ text "Active" ]
                        , br [] []
                        , button [ type_ "button", class "btn-delete", onClick (DeletePlayerReq player.id) ] [ text "Delete" ]
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
