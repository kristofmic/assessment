V2::Application.routes.draw do
  root to: 'application#main'

  get 'login', to: 'sessions#new', as: 'login'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy', as: 'logout'
  put 'forgot_password', to: 'sessions#forgot_password'

  get 'signup', to: 'users#new', as: 'signup'
  post 'signup', to: 'users#create', as: 'users'
  get 'reset_password/:token', to: 'users#reset_password', as: 'reset_password'
  put 'update_password/:token', to: 'users#update_password', as: 'update_password'

  namespace :api do
    put 'change_password', to: 'users#change_password', as: 'change_password'

    get 'requirements', to: 'requirements#fetch'

    get 'attributes', to: 'attributes#fetch'
    put 'attributes', to: 'attributes#update'
    delete 'attributes', to: 'attributes#delete'
  end
end
