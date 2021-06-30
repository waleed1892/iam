<template>
  <div id="sidebar">
    <div v-for="(filterSection,index) in filtersFields" :key="index" class="filter-section">
      <div v-if="filterSection.heading" class="heading">{{ filterSection.heading }}</div>
      <a v-for="(count,filterName) in filterSection.filters" :key="filterName"
         :class="[activeFilter===filterName ? 'active' :'']" href="/directory/everyone">
        <div>
          <div class="filter-name">{{ filterName.replace('_', ' ') }}</div>
          <div class="count">{{ count }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      activeFilter: 'everyone',
      filtersFields: {
        everyone: {
          filters: {
            everyone: 1
          }
        },
        onboarding: {
          heading: 'Onboarding',
          filters: {
            staged: 0
          }
        },
        active: {
          heading: 'Active',
          filters: {
            active: 1,
            password_reset: 0,
            locked_out: 0
          }
        },
        inactive: {
          heading: 'InActive',
          filters: {
            suspended: 0,
            deactivated: 0
          }
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
#sidebar {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(194, 201, 209, 0.73);
  min-height: 100%;

  .filter-section {
    border: 1px solid rgba(194, 201, 209, 0.79);
    padding: 10px 0;

    .heading {
      padding-left: 20px;
      margin-bottom: 15px;
      color: #4F4F4F;
    }

    a {
      display: block;

      &:not(:last-of-type) {
        margin-bottom: 8px;
      }
      &.active{
        background: rgba(40, 165, 142, 0.63);
        margin-left: -1px;
        margin-right: -1px;

        .filter-name {
          color: white;
        }

        .count {
          color: white;
        }
      }

      &:hover {
        text-decoration: none;
        background: rgba(40, 165, 142, 0.63);
        margin-left: -1px;
        margin-right: -1px;

        .filter-name {
          color: white;
        }

        .count {
          color: white;
        }
      }

      & > div {
        display: flex;
        justify-content: space-between;
        padding: 8px 10px 8px 20px;

        .filter-name {
          color: black;
          text-transform: capitalize;
        }

        .count {
          color: #4F4F4F;
        }
      }
    }
  }
}
</style>
