class RequestsConversationsController < ApplicationController
    before_action :set_requests_conversation, only: [:show, :edit, :update, :destroy]

    # GET /requests_conversations
    # GET /requests_conversations.json
    def index
      @requests_conversations = RequestsConversation.all
      render json: @requests_conversations
  
    end
  
    # GET /requests_conversations/1
    # GET /requests_conversations/1.json
    def show
      render json: @requests_conversation
  
    end
  
    # GET /requests_conversations/new
    def new
      @requests_conversation = RequestsConversation.new
    end
  
    # GET /requests_conversations/1/edit
    def edit
    end
  
    # POST /requests_conversations
    # POST /requests_conversations.json
    def create
      @requests_conversation = RequestsConversation.new(requests_conversation_params)
  
        if @requests_conversation.save
          render json: @requests_conversation, status: :created, location: @requests_conversation
  
        else
          render json: @requests_conversation.errors.full_messages , status: :unprocessable_entity
  
      end
  
    end
  
  
    def de_activate_conversations
      @deactivateconversation = RequestsConversation.where(request_id: params[:id]).count == 5
      if @deactivateconversation
        conversation.where(request_id: params[:id]).destroy_all
        render json: true
  
      else @deactivateconversation
        render json: false
  
      end
  
    end
  
    # PATCH/PUT /requests_conversations/1
    # PATCH/PUT /requests_conversations/1.json
    def update
        if @requests_conversation.update(requests_conversation_params)
          render json: @requests_conversation
  
        else
          render json: @requests_conversation.errors, status: :unprocessable_entity
  
        end
    end
  
    # DELETE /requests_conversations/1
    # DELETE /requests_conversations/1.json
    def destroy
      @requests_conversation.destroy
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_requests_conversation
        @requests_conversation = RequestsConversation.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def requests_conversation_params
        # params.fetch(:requests_conversation, {})
        params.require(:requests_conversation).permit(:request_id, :conversation_id)
      end
  
end
