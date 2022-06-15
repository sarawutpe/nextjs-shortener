-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2022 at 03:19 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shortener_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  `shortLink` varchar(255) NOT NULL,
  `view` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`id`, `link`, `shortLink`, `view`, `createdAt`, `updatedAt`) VALUES
(1, 'https://www.facebook.com/', '4LZz3f', 0, '2022-05-01 10:17:33', '2022-06-13 04:17:33'),
(2, 'https://www.facebook.com/', 'adv0Oo', 0, '2022-05-02 07:17:40', '2022-06-13 04:17:40'),
(3, 'https://www.facebook.com/', 'hvSzbB', 0, '2022-05-02 04:17:41', '2022-06-13 04:17:41'),
(4, 'https://www.facebook.com/', '2luSTc', 0, '2022-05-02 04:17:42', '2022-06-13 04:17:42'),
(5, 'https://www.youtube.com/?gl=TH', 'DrZuZC', 0, '2022-05-03 09:19:54', '2022-06-13 04:17:49'),
(6, 'https://www.youtube.com/?gl=TH', 'SBqhTx', 0, '2022-05-03 15:19:54', '2022-06-13 04:17:50'),
(7, 'https://www.youtube.com/?gl=TH', 'qNXZRM', 0, '2022-05-03 16:19:54', '2022-06-13 04:17:51'),
(8, 'https://www.youtube.com/?gl=TH', 'OoPBki', 0, '2022-05-03 18:19:54', '2022-06-13 04:17:52'),
(9, 'https://www.youtube.com/c/CodingTech', 'OdUzmb', 0, '2022-05-04 19:19:54', '2022-06-13 04:17:55'),
(10, 'https://www.youtube.com/c/CodingTech', 'MMmpC8', 0, '2022-05-05 04:17:56', '2022-06-13 04:17:56'),
(11, 'https://www.youtube.com/c/CodingTech', 'JIC6q7', 0, '2022-05-06 04:17:57', '2022-06-13 04:17:57'),
(12, 'https://www.youtube.com/c/JackHerrington', 'tlzRLj', 0, '2022-05-07 04:18:00', '2022-06-13 04:18:00'),
(13, 'https://www.youtube.com/c/JackHerrington', 'COJ8wo', 0, '2022-05-07 04:18:01', '2022-06-13 04:18:01'),
(14, 'https://www.youtube.com/c/JackHerrington', 'kPZwP2', 0, '2022-05-08 04:18:02', '2022-06-13 04:18:02'),
(15, 'https://www.youtube.com/c/CryptoBobo', 'TcEvDC', 0, '2022-05-08 04:18:05', '2022-06-13 04:18:05'),
(16, 'https://www.youtube.com/c/CryptoBobo', 'AAvNhJ', 0, '2022-05-08 04:18:06', '2022-06-13 04:18:06'),
(17, 'https://www.youtube.com/c/CryptoBobo', 'lezNyI', 0, '2022-05-09 04:18:06', '2022-06-13 04:18:06'),
(18, 'https://www.youtube.com/c/Fireship', 'P117CQ', 0, '2022-05-10 04:18:10', '2022-06-13 04:18:10'),
(19, 'https://www.youtube.com/c/Fireship', 'RFfwb0', 0, '2022-05-11 04:18:11', '2022-06-13 04:18:11'),
(20, 'https://www.youtube.com/c/Fireship', 'vXDNaN', 0, '2022-05-12 04:18:11', '2022-06-13 04:18:11'),
(21, 'https://www.youtube.com/c/Fireship', 'FpBCkr', 0, '2022-05-13 04:18:13', '2022-06-13 04:18:13'),
(22, 'https://www.youtube.com/c/PrettyPrintedTutorials', 'kVsxey', 0, '2022-05-14 04:18:17', '2022-06-13 04:18:17'),
(23, 'https://www.youtube.com/c/CalebTheVideoMaker2', 'YCSaKO', 0, '2022-05-15 04:18:22', '2022-06-13 04:18:22'),
(24, 'https://www.youtube.com/c/CalebTheVideoMaker2', 'wxxtYj', 0, '2022-05-16 04:18:22', '2022-06-13 04:18:22'),
(25, 'https://www.youtube.com/c/noobtoprofessional', 'psp2fX', 0, '2022-05-16 04:18:27', '2022-06-13 04:18:27'),
(26, 'https://www.youtube.com/c/noobtoprofessional', 'b04fSm', 0, '2022-05-17 04:18:29', '2022-06-13 04:18:29'),
(27, 'https://www.youtube.com/c/DennisIvy', 'ZM3gKK', 0, '2022-05-17 04:18:32', '2022-06-13 04:18:32'),
(28, 'https://www.youtube.com/c/DennisIvy', 'bmiMaH', 0, '2022-05-18 04:18:34', '2022-06-13 04:18:34'),
(29, 'https://www.youtube.com/c/CleverProgrammer', 'y2kxPn', 0, '2022-05-19 04:18:38', '2022-06-13 04:18:38'),
(30, 'https://www.youtube.com/c/CleverProgrammer', '5NAu3e', 0, '2022-05-20 04:18:38', '2022-06-13 04:18:38'),
(31, 'https://www.youtube.com/c/programmingwithmosh', 'WEQjcz', 0, '2022-05-20 04:18:42', '2022-06-13 04:18:42'),
(32, 'https://www.youtube.com/c/programmingwithmosh', 'yYLYgx', 0, '2022-05-21 04:18:43', '2022-06-13 04:18:43'),
(33, 'https://www.youtube.com/c/TheCharmefis', 'k5X8Hr', 0, '2022-05-22 04:18:46', '2022-06-13 04:18:46'),
(34, 'https://www.youtube.com/c/devbanban', 'SvsNnO', 0, '2022-05-23 04:18:50', '2022-06-13 04:18:50'),
(35, 'https://www.youtube.com/c/AhmedKhalifagraphics', 't1Mszv', 0, '2022-05-23 04:18:54', '2022-06-13 04:18:54'),
(36, 'https://www.youtube.com/c/DevEd', 'RH4rix', 0, '2022-05-24 04:18:57', '2022-06-13 04:18:57'),
(37, 'https://www.youtube.com/c/DevEd', 'TSiHYR', 0, '2022-05-25 04:18:58', '2022-06-13 04:18:58'),
(38, 'https://mui.com/material-ui/getting-started/installation/', '75Y7ka', 0, '2022-05-25 04:19:03', '2022-06-13 04:19:03'),
(39, 'https://mui.com/material-ui/getting-started/installation/', 'LDJmIb', 0, '2022-05-26 04:19:03', '2022-06-13 04:19:03'),
(40, 'https://mui.com/material-ui/getting-started/example-projects/', 'YKVvn1', 0, '2022-05-26 04:19:08', '2022-06-13 04:19:08'),
(41, 'https://www.zesty.io/integrations/nextjs-cms/?utm_source=mui&utm_medium=referral&utm_campaign=sponsor', 'dIq6wX', 0, '2022-05-26 04:19:16', '2022-06-13 04:19:16'),
(42, 'https://www.doit-intl.com/flexsave/?utm_source=materialui&utm_medium=refer', 'Qwegtv', 0, '2022-05-27 04:19:20', '2022-06-13 04:19:20'),
(43, 'https://mui.com/material-ui/getting-started/installation/', 'roz8jY', 0, '2022-05-28 04:19:25', '2022-06-13 04:19:25'),
(44, 'https://mui.com/material-ui/getting-started/example-projects/', 'UqZClO', 0, '2022-05-28 04:19:29', '2022-06-13 04:19:29'),
(45, 'https://mui.com/material-ui/getting-started/example-projects/', 'riXxw6', 0, '2022-05-28 04:19:31', '2022-06-13 04:19:31'),
(46, 'https://mui.com/material-ui/getting-started/example-projects/', 'lZRz2q', 0, '2022-05-28 04:19:32', '2022-06-13 04:19:32'),
(47, 'https://mui.com/material-ui/getting-started/example-projects/', 'F9OaHy', 0, '2022-05-28 04:19:33', '2022-06-13 04:19:33'),
(48, 'https://mui.com/material-ui/getting-started/example-projects/', 'tD7S37', 0, '2022-05-29 04:19:34', '2022-06-13 04:19:34'),
(49, 'https://mui.com/material-ui/getting-started/example-projects/', 'DgcIYP', 0, '2022-05-30 04:19:34', '2022-06-13 04:19:34'),
(50, 'https://www.zesty.io/integrations/nextjs-cms/?utm_source=mui&utm_medium=referral&utm_campaign=sponsor', 'wFwB4C', 0, '2022-05-30 04:19:39', '2022-06-13 04:19:39'),
(51, 'https://www.doit-intl.com/flexsave/?utm_source=materialui&utm_medium=refer', 'l5IrFH', 0, '2022-05-31 04:19:45', '2022-06-13 04:19:45'),
(52, 'https://www.youtube.com/c/Zinglecode', 'Nb7hRh', 0, '2022-05-31 04:19:49', '2022-06-13 04:19:49'),
(53, 'https://www.youtube.com/c/Zinglecode', 'Zweqlx', 0, '2022-05-31 04:19:49', '2022-06-13 04:19:49'),
(54, 'https://www.youtube.com/c/notebookspec', 'zifSzC', 0, '2022-05-31 04:19:53', '2022-06-13 04:19:53'),
(55, 'https://www.youtube.com/c/notebookspec', 'Q73iUO', 0, '2022-05-31 04:19:54', '2022-06-13 04:19:54'),
(56, 'https://www.youtube.com/c/ExtremeIT', 'NKkfGV', 0, '2022-06-01 04:19:57', '2022-06-13 04:19:57'),
(57, 'https://www.youtube.com/c/PanpholPlus', 'ffrOjZ', 0, '2022-06-01 04:20:01', '2022-06-13 04:20:01'),
(58, 'https://www.youtube.com/c/PanpholPlus', 'DWgbp3', 0, '2022-06-01 04:20:02', '2022-06-13 04:20:02'),
(59, 'https://www.youtube.com/c/PanpholPlus', 'cyF3f7', 0, '2022-06-02 04:20:03', '2022-06-13 04:20:03'),
(60, 'https://www.youtube.com/c/PanpholPlus', '6xn2FZ', 0, '2022-06-03 04:20:05', '2022-06-13 04:20:05'),
(61, 'https://www.blognone.com/node/128934', 'Q9CTe9', 0, '2022-06-03 04:20:09', '2022-06-13 04:20:09'),
(62, 'https://www.blognone.com/node/128934', 'kt9n5v', 0, '2022-06-03 04:20:10', '2022-06-13 04:20:10'),
(63, 'https://www.blognone.com/node/128934', 'Pctwvy', 0, '2022-06-03 04:20:11', '2022-06-13 04:20:11'),
(64, 'https://www.blognone.com/node/128934', 'SZwcAL', 0, '2022-06-04 04:20:11', '2022-06-13 04:20:11'),
(65, 'https://translate.google.co.th/', '90BE3A', 0, '2022-06-05 04:20:18', '2022-06-13 04:20:18'),
(66, 'https://translate.google.co.th/', 'YePqAs', 0, '2022-06-05 04:20:19', '2022-06-13 04:20:19'),
(67, 'https://translate.google.co.th/', 'o0kY4E', 0, '2022-06-05 04:20:20', '2022-06-13 04:20:20'),
(68, 'https://translate.google.co.th/', 'zl6oWj', 0, '2022-06-06 04:20:20', '2022-06-13 04:20:20'),
(69, 'https://translate.google.co.th/', 'yHFs2l', 0, '2022-06-06 04:20:21', '2022-06-13 04:20:21'),
(70, 'https://translate.google.co.th/', 'CT6gMg', 0, '2022-06-06 04:20:22', '2022-06-13 04:20:22'),
(71, 'https://translate.google.co.th/', 'icD6ve', 0, '2022-06-07 04:20:23', '2022-06-13 04:20:23'),
(72, 'https://sequelize.org/docs/v7/', 'o8QsBN', 0, '2022-06-07 04:20:26', '2022-06-13 04:20:26'),
(73, 'https://sequelize.org/docs/v7/', 'BRDTXm', 0, '2022-06-07 04:20:27', '2022-06-13 04:20:27'),
(74, 'https://sequelize.org/docs/v7/', '9GEYW8', 0, '2022-06-07 04:20:27', '2022-06-13 04:20:27'),
(75, 'https://sequelize.org/docs/v7/', 'aChlHY', 0, '2022-06-07 04:20:28', '2022-06-13 04:20:28'),
(76, 'https://sequelize.org/docs/v7/', 'svVdXd', 0, '2022-06-07 04:20:29', '2022-06-13 04:20:29'),
(77, 'https://sequelize.org/docs/v7/', 'tNbaGU', 0, '2022-06-07 04:20:29', '2022-06-13 04:20:29'),
(78, 'https://go.dev/', 'n4TZqt', 0, '2022-06-07 04:20:33', '2022-06-13 04:20:33'),
(79, 'https://go.dev/', 'AJjCXO', 0, '2022-06-07 04:20:34', '2022-06-13 04:20:34'),
(80, 'https://go.dev/', 'DGIrlM', 0, '2022-06-07 04:20:35', '2022-06-13 04:20:35'),
(81, 'https://go.dev/', 'QXstPJ', 0, '2022-06-07 04:20:35', '2022-06-13 04:20:35'),
(82, 'https://go.dev/', 'MQRNpf', 0, '2022-06-07 04:20:36', '2022-06-13 04:20:36'),
(83, 'https://go.dev/', 'ZrOhdv', 0, '2022-06-08 04:20:37', '2022-06-13 04:20:37'),
(84, 'https://go.dev/', 'lEv5IQ', 0, '2022-06-08 04:20:37', '2022-06-13 04:20:37'),
(85, 'https://go.dev/', 'uIDrUW', 0, '2022-06-08 04:20:38', '2022-06-13 04:20:38'),
(86, 'https://go.dev/', 'HXXxCm', 0, '2022-06-09 04:20:39', '2022-06-13 04:20:39'),
(87, 'https://go.dev/', '0hyywN', 0, '2022-06-09 04:20:39', '2022-06-13 04:20:39'),
(88, 'https://go.dev/', 'yiwsAJ', 0, '2022-06-10 04:20:40', '2022-06-13 04:20:40'),
(89, 'https://lastpass.com/?ac=1&lpnorefresh=1', 'C19rPj', 0, '2022-06-11 04:20:46', '2022-06-13 04:20:46'),
(90, 'https://lastpass.com/?ac=1&lpnorefresh=1', 'NZh0Eu', 0, '2022-06-12 04:20:46', '2022-06-13 04:20:46'),
(91, 'https://lastpass.com/?ac=1&lpnorefresh=1', 'NfP5zy', 0, '2022-06-12 04:20:47', '2022-06-13 04:20:47'),
(92, 'https://www.instagram.com/', 'UzZT8n', 0, '2022-06-12 04:20:50', '2022-06-13 04:20:50'),
(93, 'https://www.instagram.com/', 'bZ5bHI', 0, '2022-06-12 04:20:51', '2022-06-13 04:20:51'),
(94, 'https://www.instagram.com/', 'gGLNdj', 0, '2022-06-12 04:20:52', '2022-06-13 04:20:52'),
(95, 'https://tailwindui.com/', 'GZvLv5', 0, '2022-06-12 04:20:56', '2022-06-13 04:20:56'),
(96, 'https://tailwindui.com/', 'Tnldyb', 2, '2022-06-12 04:20:57', '2022-06-13 04:20:57'),
(169, 'https://www.youtube.com/watch?v=OuHyxnK84C4', 'n4ZxaB', 1, '2022-06-14 01:25:12', '2022-06-14 01:25:12'),
(170, 'https://www.youtube.com/watch?v=OuHyxnK84C4', 'yQ0Z0o', 102, '2022-06-14 01:25:13', '2022-06-16 02:56:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', '$2b$10$LyvlTFCXKXKoS3vjUPAS0e/MieT4G1/01Iuvr.UXzp85hPPB2GfMO', 'admin', 'admin@gmail.com', '2021-01-01 00:00:00', '2021-01-01 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
