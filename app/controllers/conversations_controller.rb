class ConversationsController < ApplicationController
    before_action :authenticate_user
  
  before_action :set_conversation, only: [:show, :edit, :update, :destroy]

  # GET /conversations
  # GET /conversations.json
  def index
    # @conversations = conversation.all

    @now = Time.now - 24.hours
    @conversations =  RequestsConversation.left_outer_joins(:request).group(:request_id).having('count(request_id) < 5') && Conversation.where("updated_at > ?", @now)
    render json: @conversations

  end

  def republish_conversation
    @now = Time.now - 24.hours
    @conversations =  RequestsConversation.left_outer_joins(:request).group(:request_id).having('count(request_id) < 5') && Conversation.where("updated_at < ?", @now)
    render json: @conversations
  end


  

  def show
    
    render json: @conversation
  end

  # GET /conversations/new
  def new
    @conversation = conversation.new
  end

  # GET /conversations/1/edit
  def edit
  end

  # POST /conversations
  # POST /conversations.json
  def create
    @conversation = Conversation.new(conversation_params)

      if @conversation.save
        
        render json: @conversation, status: :created, location: @conversation
      
      else
        render json: @conversation.errors.full_messages , status: :unprocessable_entity

      end
    # end
  end


  def update
      if @conversation.update(conversation_params)
        render json: @conversation
      
      else
        render json: @conversation.errors, status: :unprocessable_entity
      
      end
    # end
  end

  # DELETE /conversations/1
  # DELETE /conversations/1.json
  def destroy
    @conversation.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_conversation
      @conversation = conversation.find(params[:id])

    end

    # Only allow a list of trusted parameters through.
    def conversation_params
      params.require(:conversation).permit(:name, :sender_id, :receiver_id, :request_id, :patched)
    end
end
