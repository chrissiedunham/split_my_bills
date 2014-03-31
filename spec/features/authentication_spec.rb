require 'spec_helper'

feature "the signup process" do
  scenario "has a new user page" do
    visit new_user_url
    expect(page).to have_content "Sign Up"
  end

  feature "signing up a user" do
    before(:each) do
      visit new_user_url
      fill_in 'user_name', :with => "testing_username"
      fill_in 'user_email', :with => "testing_username@gmail.com"
      fill_in 'user_password', :with => "password"
      click_on 'Create user'
    end

    scenario "redirects to bills index page after signup" do
      expect(page).to have_content "All Bills"
    end

    scenario "shows user email on all pages after signup" do
      expect(page).to have_content "testing_username@gmail.com"
    end
  end
end
