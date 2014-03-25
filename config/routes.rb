V2::Application.routes.draw do
  root to: 'application#main'

  namespace :api do
    #get 'assessments/requirements', to: 'assessments#requirements'
  end
end
