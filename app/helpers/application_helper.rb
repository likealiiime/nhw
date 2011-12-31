# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  
  def tabs_for(main_symbol, subtabs=[])
    selected = ' selected' if @selected_tab.to_s == main_symbol.to_s
    html = "<div class=\"layout_tab_container#{' hasNoSubtabs' if subtabs.length == 0}#{' logout' if main_symbol == :logout}#{' selectedContainer' if selected}\">\n"
    html << "<div class=\"layout_tab#{selected}\"><a href=\"/admin/#{main_symbol.to_s}\">"
    if main_symbol == :index
      html << '<img src="/images/admin/home.png" alt="Home" title="Home"/>'
    else
      html << "#{main_symbol.to_s.capitalize}"
    end
    html << "</a></div>"
    subtabs.each do |subtab|
      # Each subtab is a array like: ['Label', 'path/to/page']
      # or just: 'label' which will be changed to: ['Label', 'label']
      subtab = subtab.to_a
      subtab = [subtab[0].capitalize, subtab[0].downcase] if subtab.length == 1
      html << "<div class=\"layout_tab\"><a href=\"/admin/#{subtab[1]}\">#{subtab[0]}</a></div>"
    end
    html << "</div>"
  end
  
  def search_hud_rows(row_params)
    html = ""; index = 0
    row_params.each do |param|
      prefix = "query[#{index}]"
      param_name = (param.class == Array ? param[1] : param).to_s
      
      html << "<tr class=\"#{cycle('', 'CIOddSkin')}\"><td>#{param_name.humanize}</td><td>"
      
      html << "<input type=\"hidden\" name=\"#{prefix}[param]\" value=\"#{param_name}\"/>"
      html << "<select name=\"#{prefix}[op]\">"
      html << '<option value="with">is</option><option value="without">is not</option></select>'
      html << '</td><td>'
      
      if param.class == Array
        html << "<select name=\"#{prefix}[value]\">"
        i = 0
        param[2].each do |label,value|
          selected = ' selected="selected"' if i == 0
          html << "<option value=\"#{value}\"#{selected}>#{label}</option>"
          i += 1
        end
        html << "</select>"
      else
        html << "<input name=\"#{prefix}[value]\" type=\"text\" size=\"15\"/></td></tr>"
      end
      
      index += 1
    end
    return html
  end
  
  def selected?(symbol)
    
  end
  
  def strftime_date_time
    "%m/%d/%y %I:%M %p"
  end
  
  def strftime_time
    "%I:%M %p"
  end
  
  def strftime_date
    "%m/%d/%y"
  end
  
  def strftime_mysql_date
    "%Y-%m-%d"
  end
  
  def current_account
    session[:account_id].nil? ? Account.empty_account : Account.find(session[:account_id])
  end
  
  def with_timezone(time)
  	time + current_account.timezone.hours + (time.isdst ? 1.hours : 0.hour)
  end

  def state_select_options
    [
      ["Alabama", "AL"],
      ["Alaska", "AK"],
      ["Arizona", "AZ"],
      ["Arkansas", "AR"],
      ["California", "CA"],
      ["Colorado", "CO"],
      ["Connecticut", "CT"],
      ["Delaware", "DE"],
      ["District of Columbia", "DC"],
      ["Florida", "FL"],
      ["Georgia", "GA"],
      ["Hawaii", "HI"],
      ["Idaho", "ID"],
      ["Illinois", "IL"],
      ["Indiana", "IN"],
      ["Iowa", "IA"],
      ["Kansas", "KS"],
      ["Kentucky", "KY"],
      ["Louisiana", "LA"],
      ["Maine", "ME"],
      ["Maryland", "MD"],
      ["Massachusetts", "MA"],
      ["Michigan", "MI"],
      ["Minnesota", "MN"],
      ["Mississippi", "MS"],
      ["Missouri", "MO"],
      ["Montana", "MT"],
      ["Nebraska", "NE"],
      ["Nevada", "NV"],
      ["New Hampshire", "NH"],
      ["New Jersey", "NJ"],
      ["New Mexico", "NM"],
      ["New York", "NY"],
      ["North Carolina", "NC"],
      ["North Dakota", "ND"],
      ["Ohio", "OH"],
      ["Oklahoma", "OK"],
      ["Oregon", "OR"],
      ["Pennsylvania", "PA"],
      ["Rhode Island", "RI"],
      ["South Carolina", "SC"],
      ["South Dakota", "SD"],
      ["Tennessee", "TN"],
      ["Texas", "TX"],
      ["Utah", "UT"],
      ["Vermont", "VT"],
      ["Virginia", "VA"],
      ["Washington", "WA"],
      ["West Virginia", "WV"],
      ["Wisconsin", "WI"],
      ["Wyoming", "WY"]
    ]
  end
  
end
