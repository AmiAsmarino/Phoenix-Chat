defmodule OpenChat.Topics do
  def start_link do
    # start_link use to start a new Agent
    Agent.start_link fn -> %{ "second" => "Second Room", "news" => "News Room" } end, value: :topics_agent
  end


def add_topic(value) do
  key = value |> String.downcase |> String.replace(~r/[^a-z0-9-]+/, "-")
  # update use to insert item in the Agent list
  Agent.update :topics_agent, fn(map)-> Map.put(map, key,value) end
end

def list_topics do
  Agent.get :topics_agent, fn(map)-> map end
end
end
