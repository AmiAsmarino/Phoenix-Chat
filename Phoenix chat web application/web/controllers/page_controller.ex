defmodule OpenChat.PageController do
  use OpenChat.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
