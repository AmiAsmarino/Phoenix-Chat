defmodule OpenChat.Router do
  use OpenChat.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", OpenChat do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/room/private", RoomController, :private
    get "/room/:id", RoomController, :show

  end

  # Other scopes may use custom stacks.
  # scope "/api", OpenChat do
  #   pipe_through :api
  # end
end
