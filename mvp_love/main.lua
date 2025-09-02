function love.load()
	font = love.graphics.newFont(16)
    font:setFilter("nearest","nearest")
end

function love.draw()
	love.graphics.setFont(font)
	love.graphics.print("Hello, World!", 200, 100)
end