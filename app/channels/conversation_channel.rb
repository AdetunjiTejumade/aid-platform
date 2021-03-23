class ConversationChannel < ApplicationCable::Channel
  def subscribed
    @room = Room.find_by(id: params[:room])
    stream_for @room
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def received(data)
    RoomsChannel.broadcast_to(@room, {room: @room, users: @room.users, messages: @room.messages})
  end
end
