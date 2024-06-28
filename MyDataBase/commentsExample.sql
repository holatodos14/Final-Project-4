-- Create the Database
CREATE DATABASE IF NOT EXISTS blogging_platform;

-- Use the Database
USE blogging_platform;

-- Create the Roles table
CREATE TABLE IF NOT EXISTS Roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL
);

-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create the Categories table
CREATE TABLE IF NOT EXISTS Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) UNIQUE NOT NULL
);

-- Create the Posts table with a category_id column
CREATE TABLE IF NOT EXISTS Posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
        ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create the Comments table
CREATE TABLE IF NOT EXISTS Comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Posts(post_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert default roles
INSERT IGNORE INTO Roles (role_name) VALUES ('User'), ('Administrator');

-- Insert example users
INSERT IGNORE INTO Users (username, email, password, role_id) VALUES 
('john_doe', 'john@example.com', 'password123', 1),
('jane_doe', 'jane@example.com', 'password123', 2),
('admin_user', 'admin@example.com', 'adminpassword', 2);

-- Insert example categories
INSERT IGNORE INTO Categories (category_name) VALUES 
('Technology'),
('Health'),
('Travel'),
('Food'),
('Lifestyle');

-- Insert example posts with categories
INSERT INTO Posts (user_id, category_id, title, content) VALUES 
(1, 1, 'Understanding JavaScript Closures', 'A deep dive into closures in JavaScript.'),
(2, 2, '10 Tips for Healthy Living', 'How to maintain a healthy lifestyle.'),
(1, 3, 'Top 5 Destinations to Visit in 2023', 'A guide to the best travel destinations for 2023.'),
(2, 4, 'The Best Vegan Recipes', 'Delicious and easy vegan recipes.'),
(1, 5, 'Improving Your Daily Productivity', 'Tips and tricks to boost your productivity.');

-- Insert example comments
INSERT INTO Comments (post_id, user_id, content) VALUES 
(1, 2, 'Great article! Very informative.'),
(1, 1, 'Thank you! Glad you found it useful.'),
(2, 1, 'I loved these tips! Thanks for sharing.'),
(3, 2, 'I have visited two of these places. Amazing experiences!'),
(4, 1, 'These recipes are fantastic. Can’t wait to try them out.'),
(5, 2, 'Productivity is key! Thanks for the tips.');
