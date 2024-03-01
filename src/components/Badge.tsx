import { onCleanup, onMount } from 'solid-js';

type Props = {
  botContainer: HTMLDivElement | undefined;
  poweredByTextColor?: string;
  badgeBackgroundColor?: string;
};

const defaultTextColor = '#303235';

export const Badge = (props: Props) => {
  let liteBadge: HTMLAnchorElement | undefined;
  let observer: MutationObserver | undefined;

  const appendBadgeIfNecessary = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((removedNode) => {
        if ('id' in removedNode && liteBadge && removedNode.id == 'lite-badge') {
          console.log("Sorry, you can't remove the brand 😅");
          props.botContainer?.append(liteBadge);
        }
      });
    });
  };

  onMount(() => {
    if (!document || !props.botContainer) return;
    observer = new MutationObserver(appendBadgeIfNecessary);
    observer.observe(props.botContainer, {
      subtree: false,
      childList: true,
    });
  });

  onCleanup(() => {
    if (observer) observer.disconnect();
  });

return (
  <span
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      textAlign: 'center',
      padding: '10px',
      backgroundColor: props.badgeBackgroundColor ?? '#ffffff',
      display: 'flex',
      flexDirection: 'row', // Standardmäßig nebeneinander
      flexWrap: 'wrap', // Erlaubt das Umbruch der Elemente
      justifyContent: 'center', // Zentriert die Buttons
    }}
  >
    <button
      onClick={() => window.open('https://fach-ki.tpm-media.de/', '_blank')}
      style={{
        fontSize: '13px',
        margin: '5px', // Kleinerer Abstand
        fontWeight: 'bold',
        color: props.poweredByTextColor ?? defaultTextColor,
        backgroundColor: '#3B81F6',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        flex: '1 1 auto', // Ermöglicht das Wachsen und Schrumpfen
        maxWidth: 'calc(50% - 10px)', // Maximale Breite für nebeneinander
      }}
    >
      ➔ Hier zur eigenen Fach-KI!
    </button>
    <button
      onClick={() => window.open('https://fine-tuning.tpm-media.de/', '_blank')}
      style={{
        fontSize: '13px',
        margin: '5px',
        fontWeight: 'bold',
        color: props.poweredByTextColor ?? defaultTextColor,
        backgroundColor: '#3B81F6',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        flex: '1 1 auto',
        maxWidth: 'calc(50% - 10px)', // Gleich wie oben, für einheitliches Aussehen
      }}
    >
      ➔ Hier zum Fine-Tuning-Modell!
    </button>
  </span>
);
};
