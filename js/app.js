const Loading = {
  init: function () {
    TweenMax.set("svg", {
      visibility: "visible",
    });

    var tl = new TimelineMax({ repeat: -1 });
    tl.to("#gradPattern", 5, {
      attr: {
        x: 400,
      },
      ease: Linear.easeNone,
    });
  },
  finish: function () {
    $(".loading").fadeOut(500);
    $("body").css("overflow", "auto");
  },
};

const Wish = {
  variants: [
    "Ты не умрешь одиноким",
    "Река сама вынесет трупы твоих врагов",
    "Мир во всем Мире",
    "Прочтешь все книги, которые планировал",
  ],
  init: function () {
    const rand = Math.round(-0.5 + Math.random() * this.variants.length);
    $(".cracker-message__inner").html(this.variants[rand]);

    this.watch();
  },
  watch: function () {
    $("#cracker").click(function () {
      $(".cracker__label").fadeToggle(500);
      $(this).toggleClass("active");
    });
  },
};

const Tree = {
  watch: function () {
    $("._tree .settings h1").click(function () {
      $("._tree .settings").toggleClass("active");
    });
  },
};

const ShowScreen = {
  success: function () {
    $("#js-success").slideDown(250);
    $(".form").slideUp(250);

    $("html, body").animate(
      {
        scrollTop: $("#js-success").offset().top,
      },
      350
    );
  },
};

const Music = {
  play: function () {
    $(".music__play").click(function () {
      const target = $(this).data("target");
      $(".music__play").removeClass("active");
      $(this).addClass("active");

      $(".music__items audio").each(function () {
        $(this)[0].pause();
        $(this)[0].currentTime = 0;
      });
      $(".music__items audio")[Number(target)].play();
    });
  },
};

Loading.init();

window.addEventListener("load", (event) => {
  Loading.finish();
  Music.play();
  Wish.init();
  Tree.watch();
});
