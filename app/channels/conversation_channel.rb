class ConversationChannel < ApplicationCable::Channel
  def subscribed
    @conversation = Conversation.find_by(id: params[:conversation])
    stream_for @conversation
  end



  def received(data)
    ConversationChannel.broadcast_to(@conversation, {conversation: @conversation, users: @conversation.users, messages: @conversation.messages})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
