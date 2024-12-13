--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `nivel` int(30) NOT NULL,
  `tiempo` decimal(65,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
COMMIT;
