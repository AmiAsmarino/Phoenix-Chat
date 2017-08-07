defmodule OpenChat.RoomController do
  use OpenChat.Web, :controller

  def show(conn, %{"id" => id}) do
    render conn, :show, id: id
  end
end
