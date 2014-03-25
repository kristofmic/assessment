V2::Application.routes.draw do
  root to: 'application#main'

  namespace :api do
    post 'users/create', to: 'users#create'

    post 'sessions/create', to: 'sessions#create'

    #get 'assessments/requirements', to: 'assessments#requirements'
  end
end
