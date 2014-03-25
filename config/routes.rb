V2::Application.routes.draw do
  root to: 'application#main'

  get 'login', to: 'sessions#new', as: 'login'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy', as: 'logout'

  get 'signup', to: 'users#new', as: 'signup'
  post 'signup', to: 'users#create', as: 'users'

  namespace :api do
    #get 'assessments/requirements', to: 'assessments#requirements'
  end
end
