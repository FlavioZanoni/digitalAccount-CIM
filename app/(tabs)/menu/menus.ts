export const getMenus = () => {
  return [
    {
      name: "Home",
      icon: "home",
      path: "/(tabs)",
      allowedRoles: ["USUARIO", "ADMINISTRADOR"],
    },
  ]
}
