-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 12 2022 г., 10:31
-- Версия сервера: 8.0.24
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_lastname` varchar(20) DEFAULT NULL,
  `user_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_gender` varchar(6) DEFAULT NULL,
  `img_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `regist_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `user_lastname`, `user_email`, `user_password`, `user_gender`, `img_path`, `regist_date`) VALUES
(17, 'Johnathan', 'null', 'john@mail.ru', '$2b$04$0oeoNWEZI/pIpUx6sZ0lyuwgPEd1BIvO7P7ovgXM0JlKdkn.RROr2', 'male', 'photo_2022-04-21_16-28-00.17.jpg', '2022-07-08 09:27:14'),
(18, 'Vincent', NULL, 'vinni@mail.ru', '$2b$04$00Dfu9HecJOW2cVUEXpRk.o8QwMKEWRBLMRQaEepON.nLCBJRnk3C', NULL, NULL, '2022-07-08 09:27:33'),
(19, 'Sam', 'Smith', 'sam@mail.ru', '$2b$04$ZQJi5N6U2RIeLJSVMuGfUO7QieHl.WsvBvar8eG8591R/7JeYZ1X6', 'null', NULL, '2022-07-08 09:27:52'),
(20, 'Geralt', NULL, 'gerry@mail.ru', '$2b$04$3vzk87DtpUbc0XT.V443v.qGeuVxVoE15bdDGvnUVleMLu6RBEMw.', NULL, NULL, '2022-07-08 09:28:10'),
(21, 'Ivan', NULL, 'ivanov@mail.ru', '$2b$04$dt2bZsn15rhOw0u/3kvT8Oj7hmPn3PRH4ByL0XgYvcZulwcZyxfAu', NULL, NULL, '2022-07-08 09:28:33'),
(22, 'Dimon', NULL, 'dimooooon@mail.ru', '$2b$04$5UQxxeTjg99IZybbExHTJuYBU5Wv0.tb.Vpu7yWkGEw9uaIU7KBrS', NULL, NULL, '2022-07-08 09:28:55'),
(23, 'Ahmed', NULL, 'ahmed@mail.ru', '$2b$04$EZMz6tg52PUMJHoOGrvSxOEgkhXekStIsuSPtDUl6xXKgPseYXLRC', NULL, NULL, '2022-07-08 09:29:22'),
(24, 'Alvi', NULL, 'alvi@mail.ru', '$2b$04$SoS4IBQcu7X9A28ADsjER.O2UoHs.Y.LDGx0VS6ODetnXldTO7O3C', NULL, NULL, '2022-07-08 09:29:47'),
(25, 'Dasha', NULL, 'dash@mail.ru', '$2b$04$Ye4Isnne0thZN6DhI2YTw.sl5aSHIx5dsiAcWstV.yMxmqNq2TUEe', NULL, NULL, '2022-07-08 09:30:04'),
(26, 'Harry', NULL, 'harry@mail.ru', '$2b$04$Yw402biA3i3Do82JY6ZVm.LU59SgPK04w4wmyVcr74RcuQYmxZ71m', NULL, NULL, '2022-07-08 09:30:25'),
(27, 'Merry', NULL, 'merr@mail.ru', '$2b$04$RlzaXnj5GwZgVzP8n.v7OOjMLd.LQ9n.9ybUdd.UNTTa31/j1fsFy', NULL, NULL, '2022-07-08 09:30:44'),
(28, 'Dock', NULL, 'dock@mail.ru', '$2b$04$BLxZJXRElakJ9dBaDcEvOuHIVWf8Y17gWVJF.qTrRyHHsz2fAM6ha', NULL, NULL, '2022-07-08 09:31:03'),
(31, 'Samuel', NULL, 'jackson@mail.ru', '$2b$04$xa5nqAicRqM9WrcNWDaWDuEbq0KuPOpAR4tqb8qi9VwumajPSyBa2', NULL, NULL, '2022-07-08 09:33:28'),
(32, 'Nurali', NULL, 'nurik@mail.ru', '$2b$04$McHBh2kGDygO5hPlFUqoNeHGWV8KPr1IeM2nrWwYg6.tTlYL277x.', NULL, NULL, '2022-07-08 09:33:51'),
(33, 'Sasha', NULL, 'sash@mail.ru', '$2b$04$21Fa4OYkC0I3Nm4Yn257g.OP5slkjbJAuBQXZvBBakwmt4aak69PS', NULL, NULL, '2022-07-08 11:54:04'),
(34, 'Abubakar', NULL, 'abubakar@mail.ru', '$2b$04$cwGqVhbDz4pv7qX9M.FGoeN2vBdZSpd77Doc64xnMH8Esg1x6M.tG', NULL, NULL, '2022-07-10 07:47:13'),
(35, 'Abub', NULL, 'abub@mail.ru', '$2b$04$QWdb7SxDCzNWWD9p8KtV/ewzuKGA9hpnzbYpdaJuNdynGqAMf/4vO', NULL, NULL, '2022-07-10 08:42:59'),
(36, 'Michaello', 'Cooper', 'Michael@mail.ru', '$2b$04$ENOIQXVF4/bu7VbWByirxu2tMXZnrGezF0Vu79G2mn58NZabTm3Xu', 'male', NULL, '2022-07-10 09:58:21');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_email` (`user_email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
