<template>
  <div class="footer">
    <span id="copyrightYear">&copy; {{ copyrightYear }}</span> |
    <span id="licensingInformation">
      <a :href="licensingInformation">Licensing Information</a>
    </span>
    |
    <span id="privacyPolicy">
      <a :href="privacyPolicy">Privacy Policy</a>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Copyright',
  props: {
    copyrightYear: String,
    licensingInformation: String,
    privacyPolicy: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#copyrightYear {
  position: static;
  top: 0%;
  right: 60.2%;
  bottom: 11.11%;
  left: 0%;
  flex: none;

  /* Inside Auto Layout */

  align-self: flex-start;
  order: 0;

  margin: 1px 0;
  color: rgba(255, 255, 255, 0.4);

  /* UI text/sm/oxygen */

  font-family: Oxygen;
  font-weight: normal;
  font-size: 12px;
  font-style: normal;
  line-height: 16px;

  letter-spacing: 0.025em;
}

#licensingInformation {
  position: static;
  top: 0%;
  right: 0%;
  bottom: 11.11%;
  left: 0%;

  /* Inside Auto Layout */

  flex: none;
  align-self: flex-start;
  order: 0;
  margin: 0 2px;

  /* white--150 */

  color: rgba(255, 255, 255, 0.5);

  /* UI text/sm/oxygen */

  font-family: Oxygen;
  font-weight: normal;
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  /* identical to box height, or 133% */

  letter-spacing: 0.025em;
}

#privacyPolicy {
  position: static;
  top: 0%;
  right: 0%;
  bottom: 11.11%;
  left: 0%;

  /* Inside Auto Layout */

  flex: none;
  align-self: center;
  order: 0;
  margin: 0 2px;

  /* white--150 */

  color: rgba(255, 255, 255, 0.5);

  /* UI text/sm/oxygen */

  font-family: Oxygen;
  font-weight: normal;
  font-size: 12px;
  font-style: normal;
  line-height: 16px;
  /* identical to box height, or 133% */

  letter-spacing: 0.025em;
}

.footer {
  position: absolute;
  left: 0;
  background: #101417;
}
</style>
