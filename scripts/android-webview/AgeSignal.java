package com.synapsedojo.app;

import android.app.Activity;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;

import com.google.android.play.agesignals.AgeSignalsManagerFactory;
import com.google.android.play.agesignals.AgeSignalsRequest;
import com.google.android.play.agesignals.AgeSignalsResult;

/**
 * Asks Google Play for the user's age range (Play Age Signals API) before the site opens, and hands the page only
 * whether the user is a minor or an adult, in the address fragment (#sd-age=minor or #sd-age=adult). The fragment is
 * never sent to a server, and the page removes it at once. Nothing else from the answer (exact range, install id)
 * leaves this class. See docs/android.md §12.6.
 *
 * Play shares the range only where a law makes it mandatory (from January 2027 California and Brazil, among others)
 * or where the user chose to share it; everywhere else, and on phones without Play (AppGallery, Uptodown), the answer
 * is empty or an error and the site opens as usual. The app never shows Play's prompt asking the user to share.
 */
final class AgeSignal {
    /** The longest the site waits for Play: after this it opens anyway, without the signal. */
    private static final long TIMEOUT_MS = 1000;

    /** "minor", "adult" or null (unknown) for the launch in progress. */
    private static String sValue;

    private AgeSignal() {}

    /** Asks Play, then runs {@code launch} once: when the answer arrives, after an error or after the timeout. */
    static void fetch(Activity activity, Runnable launch) {
        sValue = null;
        Handler main = new Handler(Looper.getMainLooper());
        boolean[] done = {false};
        Runnable once = () -> {
            if (done[0]) return;
            done[0] = true;
            launch.run();
        };
        main.postDelayed(once, TIMEOUT_MS);
        try {
            AgeSignalsManagerFactory.create(activity.getApplicationContext())
                    .checkAgeSignals(AgeSignalsRequest.builder().build())
                    .addOnSuccessListener(result -> {
                        if (!done[0]) sValue = classify(result);
                        once.run();
                    })
                    .addOnFailureListener(error -> once.run());
        } catch (RuntimeException error) {
            // Play services missing or too old: open the site without the signal.
            main.post(once);
        }
    }

    /** Only two facts are kept: under 18 or 18 and over. An empty answer means the user is not sharing. */
    static String classify(AgeSignalsResult result) {
        Integer upper = result.ageUpper();
        Integer lower = result.ageLower();
        if (upper != null && upper < 18) return "minor";
        if (lower != null && lower >= 18) return "adult";
        return null;
    }

    /** The launch address with the signal in its fragment, or unchanged when the age is unknown. */
    static Uri addTo(Uri uri) {
        if (sValue == null || uri == null) return uri;
        return uri.buildUpon().fragment("sd-age=" + sValue).build();
    }
}
