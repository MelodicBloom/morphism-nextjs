"""Verify glass URL controls on a locally served production build."""
import os
from pathlib import Path
import re
import signal
import subprocess
import time
import urllib.request
from urllib.parse import parse_qs, urlsplit

from playwright.sync_api import expect, sync_playwright

BASE = 'http://127.0.0.1:3000'
ROOT = Path(__file__).resolve().parent.parent

def main():
    server = subprocess.Popen(['npm', 'run', 'start', '--', '-p', '3000'], cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
    try:
        for _ in range(100):
            try:
                with urllib.request.urlopen(BASE + '/atlas/glass', timeout=1) as response:
                    if response.status == 200:
                        break
            except OSError:
                time.sleep(.2)
        else:
            raise RuntimeError('production server did not start')
        with sync_playwright() as p:
            browser=p.chromium.launch()
            page=browser.new_page(viewport={'width':1440,'height':900},reduced_motion='reduce')
            errors=[]
            page.on('pageerror',lambda e:errors.append(str(e)))
            page.goto(BASE+'/atlas/glass?blur=10&saturation=120&tag=keep#proof',wait_until='domcontentloaded')
            blur=page.get_by_label(re.compile(r'^Glass blur'))
            saturation=page.get_by_label(re.compile(r'^Glass saturation'))
            expect(blur).to_have_value('10'); expect(saturation).to_have_value('120')
            blur.focus(); blur.press('End'); saturation.focus(); saturation.press('Home')
            expect(blur).to_have_value('40'); expect(saturation).to_have_value('0')
            query=parse_qs(urlsplit(page.url).query)
            assert query=={'blur':['40'],'saturation':['0'],'tag':['keep']}
            assert urlsplit(page.url).fragment=='proof'
            effect=page.locator('.mat-glass').evaluate('el => getComputedStyle(el).backdropFilter')
            assert '40px' in effect and ('saturate(0)' in effect or 'saturate(0%)' in effect),effect
            page.reload(wait_until='domcontentloaded')
            expect(blur).to_have_value('40'); expect(saturation).to_have_value('0')
            page.evaluate("history.pushState(history.state,'','?blur=7&saturation=180&tag=keep#proof')")
            page.go_back(wait_until='domcontentloaded')
            expect(blur).to_have_value('40'); expect(saturation).to_have_value('0')
            page.go_forward(wait_until='domcontentloaded')
            expect(blur).to_have_value('7'); expect(saturation).to_have_value('180')
            output=ROOT/'test-evidence';output.mkdir(exist_ok=True)
            page.screenshot(path=str(output/'glass-desktop.png'))
            page.goto(BASE+'/atlas/glass?blur=999&saturation=bad',wait_until='domcontentloaded')
            expect(blur).to_have_value('40'); expect(saturation).to_have_value('170')
            page.goto(BASE+'/atlas/glass?blur=-1&saturation=999',wait_until='domcontentloaded')
            expect(blur).to_have_value('0'); expect(saturation).to_have_value('300')
            page.goto(BASE+'/atlas/glass?blur=3&blur=4&saturation=200',wait_until='domcontentloaded')
            expect(blur).to_have_value('18'); expect(saturation).to_have_value('200')
            page.get_by_role('button',name='Reset',exact=True).click()
            expect(blur).to_have_value('18'); expect(saturation).to_have_value('170')
            assert 'blur' not in parse_qs(urlsplit(page.url).query)
            assert 'saturation' not in parse_qs(urlsplit(page.url).query)
            page.set_viewport_size({'width':390,'height':844})
            page.screenshot(path=str(output/'glass-mobile.png'))
            assert not errors,errors
            browser.close()
        print('PASS: bounded glass URL state, CSS, reload, reset and desktop/mobile smoke')
    finally:
        try: os.killpg(server.pid,signal.SIGTERM)
        except ProcessLookupError: pass
        server.wait(timeout=10)

if __name__ == '__main__':
    main()
