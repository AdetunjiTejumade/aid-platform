class RequestUsersController < ApplicationController
    before_action :authenticate_user
    before_action :set_requests_user, only: [:show, :edit, :update, :destroy]

    # GET /requests_users
    # GET /requests_users.json
    def index
        @requests_users = RequestsUser.all
        render json: @requests_users


    end

    # GET /requests_users/1
    # GET /requests_users/1.json
    def show
        render json: @requests_user

    end

    # GET /requests_users/new
    def new
        @requests_user = RequestsUser.new
    end

    # GET /requests_users/1/edit
    def edit

    end

    # POST /requests_users
    # POST /requests_users.json
    def create
        @requests_user = RequestsUser.new(requests_user_params)
    
        # respond_to do |format|
        if @requests_user.save
            render json: @requests_user, status: :created, location: @requests_user

        else
            render json: @requests_user.errors.full_messages , status: :unprocessable_entity


        end
        # end
    end

    def samevolunteer
        
        @click = RequestsUser.where(user_id: current_user, request_id: params[:id]).count == 1
        if @click
        render json: true

        else @click
        render json: false

        end

    end


    def de_activate
        
        @inactiveRequests = RequestsUser.where(request_id: params[:id], fulfilled: true).count == 5

        if @inactiveRequests
            render json: true

        else @inactiveRequests
            render json: false

        end

    end

    
    def update 
        if @requests_user.update(requests_user_params)
            render json: @requests_user

        else
            render json: @requests_user.errors, status: :unprocessable_entity

        end
    end

    def destroy
        @requests_user.destroy
    end

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_requests_user
        @requests_user = RequestsUser.find(params[:id])
        end

        # Only allow a list of trusted parameters through.
        def requests_user_params
        # params.fetch(:requests_user, {})
        params.require(:requests_user).permit(:request_id, :user_id, :fulfilled)
        end
end
