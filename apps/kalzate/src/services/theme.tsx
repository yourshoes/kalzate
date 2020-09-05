
//@todo migrate to styled-theming 
class ThemeService {

    themes = {

        dark: {
            app: {
              bgColor: '#161719',
              color: '#a3a8ae',
              border: '1px solid #111314', // 1px solid #27292c
              padding: '5px',
              switchPanelIconColor: 'rgba(255, 255, 255, 0.4)',
              scrollThumbInactiveBgColor: 'rgba(100, 100, 100, 0.4)',
              scrollThumbBgColor: 'rgba(100, 100, 100, 0.8)',
              scrollTrackShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
              // scroll props below are possibly not used
              scrollThumb: 'rgb(60, 60, 60)',
              scrollThumbInactive: 'rgb(60, 60, 60)',
              scrollCorner: 'rgb(60, 60, 60)',
              scrollTrack: 'transparent',
              scrollShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            },
            footer: {
              bgColor: '#161719',
              color: '#a3a8ae',
              border: '1px solid #27292c',
            },
            sidebar: {
              bgColor: '#161719',
              color: '#a3a8ae', // 'rgba(163, 168, 174, 0.5)'
              border: '1px solid #27292c',
              hoverColor: 'rgba(163, 168, 174, 0.8)',
              selected: 'rgba(100, 100, 100, 0.1)',
              placeholderColor: 'rgba(163, 168, 174, 0.9)',
            },
            settings: {
              panelBgColor: 'rgba(10, 10, 10, 0.2)',
            },
            discover: {
              panelBgColor: 'rgba(10, 10, 10, 0.2)',
              helpBgColor: 'rgba(51,51,51, .9)',
              helpColor: 'rgba(151,151,151,1)',
              tooltipColor: 'rgba(115, 201, 144, .6)',
            },
            charts: {
              axis: '#FFF',
            },
            tables: {
              color: 'white',
              colorEven: 'rgba(187, 183, 183, 1)',
              bgColorEven: 'rgba(163, 168, 174, 0.2)',
              bgColor: 'rgba(163, 168, 174, 0.1)',
              highlightBgColor: 'rgba(226, 192, 141, .25)',
            },
            tooltips: {
              bgColor: 'rgba(39, 41, 44, 0.9)',
            },
            home: {
              color: 'rgba(163, 168, 174, 0.3)',
              titleColor: 'rgba(163, 168, 174, 0.3)',
              svgColor: 'rgba(163, 168, 174, 0.1)',
              tryButtonHoverColor: 'rgba(255, 255, 255, 0.6)',
            },
            blog: {
              bgColor: '#161719',
              border: '1px solid #27292c',
              switcherBgColor: 'rgb(60, 60, 60)',
              switcherColor: 'inherit',
              sectionsHoverColor: 'rgba(255, 255, 255, 0.9)',
            },
            workspace: {
              activeLine: 'rgba(100, 100, 100, 0.1)',
              actionsPanel: {
                bgColor: 'rgba(39, 41, 44, 0.9)',
              },
            },
            fuzzyFinder: {
              bgColor: '#1d1f21',
              bgColorItem: '#222426',
              bgColorItemActive: '#303337',
              bgColorTextbox: 'rgba(0, 0, 0, 0.6)',
              bgColorHint: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #111314',
              colorTextbox: 'rgba(115, 201, 144, 0.7)',
              colorItem: '#d9dbde',
              colorHint: '#d7dae0',
            },
            tour: {
              bgColor: 'rgba(39, 41, 44, 0.9)',
              iconColor: 'rgb(226, 192, 141)',
              iconColorHover: 'rgb(226, 192, 141)',
            },
            ribbon: {
              bgColor: '#373636',
              color: '#7d7d7d',
              textShadow: '0 -.08em rgba(0, 0, 0, 0.5)',
              shadow: '0 .15em .23em 0 rgba(0, 0, 0, 0.5)',
              image: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15))',
            },
            tickets: {
              placeholderColor: 'rgba(163, 168, 174, 0.9)',
              searchColor: 'rgba(163, 168, 174, 0.5)',
              searchMastchesListBgColor: 'rgba(100, 100, 100, 1)',
              searchMastchesListColor: 'white',
            },
          },
          
          monokai: {
            app: {
              bgColor: '#2d2c2c',
              color: '#bbb7b7',
              border: '1px solid rgba(163,168,174,0.1)',
              padding: '5px',
              switchPanelIconColor: 'rgba(255, 255, 255, 0.4)',
              scrollThumbInactiveBgColor: 'rgba(100, 100, 100, 0.4)',
              scrollThumbBgColor: 'rgba(100, 100, 100, 0.8)',
              scrollTrackShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
              // scroll props below are possibly not used
              scrollThumb: '#979797',
              scrollThumbInactive: '#979797',
              scrollCorner: '#979797',
              scrollTrack: 'transparent',
              scrollShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            },
            footer: {
              bgColor: '#2d2c2c',
              color: '#a3a8ae',
              border: '1px solid rgba(163,168,174,0.1)',
            },
            sidebar: {
              bgColor: '#2d2c2c',
              color: '#979797',
              border: '1px solid rgba(163,168,174,0.1)',
              hoverColor: '#d7d7d7',
              selected: '#373636',
              placeholderColor: 'rgba(163, 168, 174, 0.9)',
            },
            home: {
              color: 'rgba(163, 168, 174, 0.3)',
              titleColor: 'rgba(163, 168, 174, 0.3)',
              svgColor: 'rgba(163, 168, 174, 0.1)',
              tryButtonHoverColor: 'rgba(255, 255, 255, 0.6)',
            },
            settings: {
              panelBgColor: 'rgba(10, 10, 10, 0.2)',
            },
            discover: {
              panelBgColor: 'rgba(10, 10, 10, 0.2)',
              helpBgColor: 'rgba(51,51,51, .9)',
              helpColor: 'rgba(151,151,151,1)',
              tooltipColor: 'rgba(115, 201, 144, .6)',
            },
            charts: {
              axis: '#FFF',
            },
            tables: {
              color: 'white',
              colorEven: 'rgba(187, 183, 183, 1)',
              bgColorEven: 'rgba(163,168,174,0.2)',
              bgColor: 'rgba(163,168,174,0.1)',
              highlightBgColor: 'rgba(226, 192, 141, .25)',
            },
            tooltips: {
              bgColor: 'rgba(39, 41, 44, 0.9)',
            },
            blog: {
              bgColor: '#2d2c2c',
              border: '1px solid rgba(163,168,174,0.1)',
              switcherBgColor: '#979797',
              switcherColor: 'rgb(60, 60, 60)',
              sectionsHoverColor: 'rgba(255, 255, 255, 0.9)',
            },
            workspace: {
              activeLine: '#373636',
              actionsPanel: {
                bgColor: '#373636',
              },
            },
            fuzzyFinder: {
              bgColor: '#2d2c2c',
              bgColorItem: '#2d2c2c',
              bgColorItemActive: '#373636',
              bgColorTextbox: 'rgba(0, 0, 0, 0.6)',
              bgColorHint: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #111314',
              colorTextbox: 'rgba(115, 201, 144, 0.7)',
              colorItem: '#d9dbde',
              colorHint: '#d7dae0',
            },
            tour: {
              bgColor: '#373636',
              iconColor: 'rgb(226, 192, 141)',
              iconColorHover: 'rgb(226, 192, 141)',
            },
            ribbon: {
              bgColor: '#161719',
              color: '#7d7d7d',
              textShadow: '0 -.08em rgba(0, 0, 0, 0.5)',
              shadow: '0 .15em .23em 0 rgba(0, 0, 0, 0.5)',
              image: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15))',
            },
            tickets: {
              placeholderColor: 'rgba(163, 168, 174, 0.9)',
              searchColor: 'rgba(163, 168, 174, 0.5)',
              searchMastchesListBgColor: 'rgba(100, 100, 100, 1)',
              searchMastchesListColor: 'white',
            },
          },

           light: {
            app: {
              bgColor: '#f5f5f5',
              color: '#9b9b9b',
              border: '1px solid rgba(163,168,174,0.2)',
              padding: '5px',
              switchPanelIconColor: 'rgba(110, 110, 110, 0.4)',
              scrollThumbInactiveBgColor: 'rgba(100, 100, 100, 0.1)',
              scrollThumbBgColor: 'rgba(100, 100, 100, 0.2)',
              scrollTrackShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.1)',
              // scroll props below are possibly not used
              scrollThumb: '#bebebe',
              scrollThumbInactive: 'transparent',
              scrollTrack: 'transparent',
              scrollCorner: 'transparent',
              scrollShadow: 'none',
            },
            footer: {
              bgColor: '#f5f5f5',
              color: '#a3a8ae',
              border: '1px solid rgba(163,168,174,0.2)',
            },
            sidebar: {
              bgColor: '#f5f5f5',
              color: '#979797',
              border: '1px solid rgba(163,168,174,0.2)',
              hoverColor: '#000',
              selected: '#ececec',
              placeholderColor: '#000',
            },
            home: {
              color: '#b3b3b3',
              titleColor: '#b3b3b3',
              svgColor: 'rgba(163, 168, 174, 0.8)',
              tryButtonHoverColor: 'rgba(100, 100, 100, 0.6)',
            },
            settings: {
              panelBgColor: 'rgba(183, 181, 181, 0.2)',
            },
            discover: {
              panelBgColor: 'rgba(183, 181, 181, 0.2)',
              axis: '#000',
              helpBgColor: 'rgba(205, 201, 201, 1)',
              helpColor: 'rgba(100,100,100,1)',
              tooltipColor: '#000',
            },
            charts: {
              axis: '#b3b3b3',
            },
            tables: {
              color: '#000',
              colorEven: '#000',
              bgColorEven: 'rgba(163,168,174,0.2)',
              bgColor: 'rgba(163,168,174,0.1)',
              highlightBgColor: 'rgba(226, 192, 141, .25)',
            },
            tooltips: {
              bgColor: 'rgba(29, 29, 29, 0.2)',
            },
            blog: {
              bgColor: '#f5f5f5',
              border: '1px solid rgba(163,168,174,0.2)',
              switcherBgColor: '#bebebe',
              switcherColor: '#f5f5f5',
              sectionsHoverColor: '#adaaaa',
            },
            workspace: {
              activeLine: '#fff',
              actionsPanel: {
                bgColor: '#ececec',
              },
            },
            fuzzyFinder: {
              bgColor: '#ececec',
              bgColorItem: '#f5f5f5',
              bgColorItemActive: '#ececec',
              bgColorTextbox: '#f5f5f5',
              bgColorHint: 'rgba(255, 255, 255, 0.2)',
              border: '1px solid #f5f5f5',
              colorTextbox: '#9b9b9b',
              colorItem: '#9b9b9b',
              colorHint: '#9b9b9b',
            },
            tour: {
              bgColor: '#ececec',
              iconColor: '#979797',
              iconColorHover: 'rgba(255, 255, 255, 0.8)',
            },
            ribbon: {
              bgColor: '#fffdfd',
              color: '#a6a6a6',
              shadow: 'none',
              textShadow: 'none',
              image: 'none',
            },
            tickets: {
              placeholderColor: '#000',
              searchColor: 'rgba(163, 168, 174, 0.8)',
              searchMastchesListBgColor: 'rgba(163,168,174,0.1)',
              searchMastchesListColor: '#000',
            },
          }

    }

    getDefault(){
        return this.themes.monokai;
    }
  
    getThemeItems(currentTheme) {
        return Object.keys(this.themes).map((theme) => ({
          value: theme,
          title: `kz.containers.ThemeProvider.themes.${theme}`,
          marked: theme === currentTheme,
        }));
      }
  }
  
  export default new ThemeService();
  
  