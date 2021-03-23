Rails.application.routes.draw do
  resources :requests_conversations
  root 'pages#index'

  resources :conversations

  resources :messages
  resources :requests_users
  scope '/auth' do
      post '/signin', to: 'user_token#create'
      post '/signup', to: 'users#create'

  end

  resources :users
  resources :requests
  mount ActionCable.server => '/cable'

  get 'samevolunteer/:id', to: 'requests_users#samevolunteer'
    
  get 'deactivate/:id', to: 'requests_users#de_activate'

  get 'republish', to: 'requests#re_publish'

  get 'republishroom', to: 'rooms#republish_room'

  get 'deactivaterooms/:id', to: 'requests_rooms#de_activate_rooms'

  post 'rails/active_storage/direct_uploads', to: 'direct_uploads#create'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
