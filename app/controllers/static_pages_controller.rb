class StaticPagesController < ApplicationController
  
  def dashboard
    require_signed_in!
  end

  def home
  end
end
