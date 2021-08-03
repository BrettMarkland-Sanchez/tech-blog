const logout = async () => {
  req.session.destroy(() => {
    res.status(205).end();
  });

  document.location.replace('/');
};

document.querySelector('#logout').addEventListener('click', logout);
