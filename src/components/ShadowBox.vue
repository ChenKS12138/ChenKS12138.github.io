<template>
  <div>
    <div class="title-content">
      <slot name="title-content"></slot>
    </div>
    <div class="box-container">
      <div class="left-toc">
        <slot name="left-toc"></slot>
      </div>
      <div class="content-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-content {
  position: relative;
  z-index: 2;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 1rem;
}

.box-container {
  @apply max-w-4/5;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin: 0 auto;



  @media screen and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

}

.left-toc {
  max-width: 300px;

  position: sticky;
  top: 3rem;
  padding-top: 1rem;
  padding-right: 1rem;

  max-height: 800px;
  overflow-y: scroll;

  @media screen and (max-width: 1200px) {
    display: none;
  }
}

.content-container {
  @apply min-h-2xl p-5 relative bg-white <lg: (p-2) lg: w-4xl color-text-comm dark:(color-bg-dark text-white);
  top: -80px;
  z-index: 4;
  border-radius: 8px;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
  /* min-width: 80%; */
  /* width: calc(100 - 300px); */
  max-width: 100%;
}
</style>